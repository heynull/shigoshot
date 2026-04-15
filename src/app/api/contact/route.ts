import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contactSchema'

// Rate limiting: in-memory store of IP addresses and submission counts
// Format: { ip: { count: number, resetTime: number } }
// NOTE: In production, use Redis instead of in-memory storage for distributed rate limiting
const rateLimitStore = new Map<
  string,
  { count: number; resetTime: number }
>()

const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const RATE_LIMIT_MAX = 3 // Max 3 submissions per IP per hour

function getRateLimitKey(ip: string): string {
  return `contact:${ip}`
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const key = getRateLimitKey(ip)
  const data = rateLimitStore.get(key)

  if (!data) {
    // First request from this IP
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (now > data.resetTime) {
    // Window expired, reset
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  // Window still active
  if (data.count >= RATE_LIMIT_MAX) {
    return false
  }

  data.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Lazy load Resend to avoid build-time errors if API key is missing
    const { resend } = await import('@/lib/resend')

    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate using Zod schema
    const validation = contactSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = validation.data
    const studioEmail = process.env.CONTACT_EMAIL || 'noreply@shigoshots.com'

    // Email A: To studio owner
    const studioEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #d4cfc5; background-color: #080808; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0e0e0e; border: 1px solid #6a6a6a; }
            .header { border-bottom: 2px solid #c9a84c; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { color: #c9a84c; font-size: 24px; margin: 0; font-weight: 300; }
            .content { margin-bottom: 30px; }
            .field { margin-bottom: 20px; }
            .field-label { color: #c9a84c; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 500; margin-bottom: 5px; }
            .field-value { color: #d4cfc5; font-size: 16px; margin: 0; }
            .footer { border-top: 1px solid #6a6a6a; padding-top: 20px; font-size: 12px; color: #6a6a6a; }
            .gold-accent { color: #c9a84c; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Inquiry Received</h1>
            </div>

            <div class="content">
              <div class="field">
                <div class="field-label">From</div>
                <p class="field-value">${data.firstName} ${data.lastName}</p>
              </div>

              <div class="field">
                <div class="field-label">Email</div>
                <p class="field-value">${data.email}</p>
              </div>

              <div class="field">
                <div class="field-label">Project Type</div>
                <p class="field-value"><span class="gold-accent">${data.projectType.charAt(0).toUpperCase() + data.projectType.slice(1)}</span></p>
              </div>

              <div class="field">
                <div class="field-label">Message</div>
                <p class="field-value">${data.message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>

            <div class="footer">
              <p>Submitted at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Email B: Auto-reply to sender
    const senderEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #d4cfc5; background-color: #080808; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0e0e0e; border: 1px solid #6a6a6a; }
            .header { border-bottom: 2px solid #c9a84c; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { color: #c9a84c; font-size: 28px; margin: 0; font-weight: 300; }
            .content { margin-bottom: 30px; line-height: 1.8; }
            .content p { color: #d4cfc5; margin: 15px 0; }
            .footer { border-top: 1px solid #6a6a6a; padding-top: 20px; font-size: 12px; color: #6a6a6a; }
            .gold-accent { color: #c9a84c; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You</h1>
            </div>

            <div class="content">
              <p>Dear <span class="gold-accent">${data.firstName}</span>,</p>

              <p>We've received your inquiry and truly appreciate you reaching out to ShigoShots Studio. Your message means a lot to us.</p>

              <p>Our creative team will review your project details and respond within <span class="gold-accent">48 hours</span> with next steps and availability.</p>

              <p>In the meantime, feel free to reach out directly if you have any urgent questions.</p>

              <p>—<br/>ShigoShots<br/>Photography</p>
            </div>

            <div class="footer">
              <p>Email: <span class="gold-accent">${studioEmail}</span></p>
              <p>Thank you for trusting us with your vision.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send both emails via Resend
    const [studioResponse, senderResponse] = await Promise.all([
      resend.emails.send({
        from: 'ShigoShots <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'mosesajila@gmail.com',
        subject: `New Inquiry — ${data.projectType} from ${data.firstName} ${data.lastName}`,
        html: studioEmailHtml,
      }),
      resend.emails.send({
        from: 'ShigoShots <onboarding@resend.dev>',
        to: data.email,
        subject: 'Your inquiry has been received — ShigoShots Studio',
        html: senderEmailHtml,
      }),
    ])

    // Check if both emails sent successfully
    if (studioResponse.error || senderResponse.error) {
      console.error('Email sending error:', studioResponse.error || senderResponse.error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
