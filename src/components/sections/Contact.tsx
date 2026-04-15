'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { contactSchema, type ContactFormData } from '@/lib/contactSchema'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const projectTypes = [
  { value: 'portrait', label: 'Portrait & Editorial' },
  { value: 'wedding', label: 'Wedding & Events' },
  { value: 'commercial', label: 'Commercial & Brand' },
  { value: 'fineart', label: 'Fine Art & Prints' },
  { value: 'other', label: 'Something Else' },
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface FormFieldProps {
  label: string
  fieldId: string
  error?: string
  isTouched?: boolean
  children: React.ReactNode
}

function FormField({ label, fieldId, error, isTouched, children }: FormFieldProps) {
  return (
    <div className="relative">
      <label
        htmlFor={fieldId}
        style={{
          display: 'block',
          fontSize: '10px',
          color: '#888',
          marginBottom: '8px',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>

      <div className="relative">
        {children}

        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isTouched ? 1 : 0, opacity: error ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'center' }}
        />

        {error && isTouched && (
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-red-500 w-full"
            animate={{
              opacity: [1, 0.5, 1],
              boxShadow: [
                '0 0 0px rgba(239, 68, 68, 0)',
                '0 0 8px rgba(239, 68, 68, 0.4)',
                '0 0 0px rgba(239, 68, 68, 0)',
              ],
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}
      </div>

      <AnimatePresence>
        {error && isTouched && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              color: '#f87171',
              fontSize: '12px',
              marginTop: '4px',
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function SuccessCheckmark() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ margin: '0 auto 24px' }}
    >
      <motion.circle
        cx="32"
        cy="32"
        r="28"
        stroke="#c9a84c"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
      />
      <motion.path
        d="M 20 32 L 28 40 L 44 24"
        stroke="#c9a84c"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
          delay: prefersReducedMotion ? 0 : 0.3,
          ease: 'easeOut',
        }}
      />
    </motion.svg>
  )
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useReducedMotion()
  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const formValues = watch()

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to send inquiry')
      }

      setFormStatus('success')
      reset()
      setTouchedFields({})
      setSelectedProject('')

      setTimeout(() => {
        setFormStatus('idle')
      }, 5000)
    } catch (error) {
      setFormStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'An error occurred. Please try again.'
      )
    }
  }

  const handleFieldBlur = (fieldName: string) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }))
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section
      style={{
        backgroundColor: '#080808',
        padding: '80px 24px',
      }}
      id="contact"
    >
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          Let's Create{' '}
          <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Something</em>
          <br />
          Extraordinary
        </h2>

        {/* Subtitle */}
        <p
          style={{
            color: '#888',
            fontSize: '14px',
            textAlign: 'center',
            marginBottom: '24px',
            lineHeight: 1.7,
          }}
        >
          Tell us about your project and we'll get back to you within 48 hours.
        </p>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          {/* Phone Number */}
          <a
            href="tel:+2349015159470"
            className="flex items-center gap-2 text-[#888] hover:text-[#c9a84c] transition-colors duration-300 text-sm sm:text-base"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>+234 901 515 9470</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/2349160184596"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full text-sm sm:text-base font-medium hover:bg-[#20b859] transition-all duration-300 hover:scale-105"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/shigoshot/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#E4405F] to-[#F56040] text-white px-4 py-2 rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="5"/>
              <line x1="17" y1="7" x2="17.01" y2="7"/>
            </svg>
            <span>Instagram</span>
          </a>

          {/* TikTok Button */}
          <a
            href="https://www.tiktok.com/@shigoshot/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#010101] text-white px-4 py-2 rounded-full text-sm sm:text-base font-medium hover:bg-[#1a1a1a] transition-all duration-300 hover:scale-105 border border-white/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
            </svg>
            <span>TikTok</span>
          </a>
        </div>

        {/* Success State */}
        {formStatus === 'success' && (
          <motion.div
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          >
            <SuccessCheckmark />

            <motion.p
              style={{
                color: 'white',
                fontSize: '16px',
                marginBottom: '24px',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : 0.4,
              }}
            >
              Message sent successfully!
            </motion.p>

            <motion.button
              onClick={() => setFormStatus('idle')}
              style={{
                background: 'none',
                border: 'none',
                color: '#c9a84c',
                fontSize: '12px',
                cursor: 'pointer',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Send another message →
            </motion.button>
          </motion.div>
        )}

        {/* Form */}
        {formStatus !== 'success' && (
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
            animate={{ opacity: formStatus === 'loading' ? 0.6 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* First & Last Name Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
              }}
              className="name-grid"
            >
              {/* First Name */}
              <FormField
                label="First Name"
                fieldId="firstName"
                error={errors.firstName?.message}
                isTouched={touchedFields.firstName}
              >
                <input
                  id="firstName"
                  {...register('firstName')}
                  type="text"
                  placeholder=""
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #333',
                    paddingBottom: '12px',
                    paddingTop: '8px',
                    fontSize: '16px',
                    fontWeight: 300,
                    color: 'white',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderBottomColor = '#c9a84c'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderBottomColor = '#333'
                    handleFieldBlur('firstName')
                  }}
                />
              </FormField>

              {/* Last Name */}
              <FormField
                label="Last Name"
                fieldId="lastName"
                error={errors.lastName?.message}
                isTouched={touchedFields.lastName}
              >
                <input
                  id="lastName"
                  {...register('lastName')}
                  type="text"
                  placeholder=""
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #333',
                    paddingBottom: '12px',
                    paddingTop: '8px',
                    fontSize: '16px',
                    fontWeight: 300,
                    color: 'white',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderBottomColor = '#c9a84c'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderBottomColor = '#333'
                    handleFieldBlur('lastName')
                  }}
                />
              </FormField>
            </div>

            {/* Email */}
            <FormField
              label="Email Address"
              fieldId="email"
              error={errors.email?.message}
              isTouched={touchedFields.email}
            >
              <input
                id="email"
                {...register('email')}
                type="email"
                placeholder=""
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #333',
                  paddingBottom: '12px',
                  paddingTop: '8px',
                  fontSize: '16px',
                  fontWeight: 300,
                  color: 'white',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = '#c9a84c'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor = '#333'
                  handleFieldBlur('email')
                }}
              />
            </FormField>

            {/* Project Type Dropdown */}
            <FormField
              label="Project Type"
              fieldId="projectType"
              error={typeof errors.projectType?.message === 'string' ? errors.projectType.message : undefined}
              isTouched={touchedFields.projectType}
            >
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <input
                  type="hidden"
                  {...register('projectType')}
                  value={selectedProject}
                />

                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen)
                    handleFieldBlur('projectType')
                  }}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #333',
                    color: selectedProject ? 'white' : '#666',
                    padding: '12px 0 8px 0',
                    fontSize: '16px',
                    fontWeight: 300,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderBottomColor = '#c9a84c'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderBottomColor = '#333'
                  }}
                >
                  <span>
                    {selectedProject
                      ? projectTypes.find(t => t.value === selectedProject)?.label
                      : 'Select a project type'}
                  </span>
                  <motion.span
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color: '#c9a84c',
                      fontSize: '12px',
                      marginLeft: '8px',
                      display: 'inline-block',
                    }}
                  >
                    ▼
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: '#1a1a1a',
                        border: '1px solid #2a2a2a',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        zIndex: 50,
                        marginTop: '8px',
                        transformOrigin: 'top',
                      }}
                    >
                      {projectTypes.map((type, index) => (
                        <motion.button
                          key={type.value}
                          type="button"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            setSelectedProject(type.value)
                            setValue('projectType', type.value as 'portrait' | 'wedding' | 'commercial' | 'fineart' | 'other', { shouldValidate: true })
                            setIsDropdownOpen(false)
                            handleFieldBlur('projectType')
                          }}
                          style={{
                            width: '100%',
                            background:
                              selectedProject === type.value
                                ? 'rgba(201,168,76,0.1)'
                                : 'transparent',
                            border: 'none',
                            borderBottom:
                              index < projectTypes.length - 1 ? '1px solid #222' : 'none',
                            color: selectedProject === type.value ? '#c9a84c' : '#ccc',
                            padding: '14px 16px',
                            fontSize: '14px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (selectedProject !== type.value) {
                              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                              e.currentTarget.style.color = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedProject !== type.value) {
                              e.currentTarget.style.background = 'transparent'
                              e.currentTarget.style.color = '#ccc'
                            }
                          }}
                        >
                          {type.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FormField>

            {/* "Tell us more" - shows when "other" is selected */}
            {selectedProject === 'other' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FormField
                  label="Tell us more"
                  fieldId="otherProjectType"
                  error={errors.otherProjectType?.message}
                  isTouched={touchedFields.otherProjectType}
                >
                  <input
                    id="otherProjectType"
                    {...register('otherProjectType')}
                    type="text"
                    placeholder="Describe your project..."
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #333',
                      paddingBottom: '12px',
                      paddingTop: '8px',
                      fontSize: '16px',
                      fontWeight: 300,
                      color: 'white',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderBottomColor = '#c9a84c'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderBottomColor = '#333'
                      handleFieldBlur('otherProjectType')
                    }}
                  />
                </FormField>
              </motion.div>
            )}

            {/* Message */}
            <FormField
              label="Message"
              fieldId="message"
              error={errors.message?.message}
              isTouched={touchedFields.message}
            >
              <textarea
                id="message"
                {...register('message')}
                placeholder=""
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #333',
                  paddingBottom: '12px',
                  paddingTop: '8px',
                  fontSize: '16px',
                  fontWeight: 300,
                  color: 'white',
                  fontFamily: 'inherit',
                  outline: 'none',
                  minHeight: '120px',
                  resize: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = '#c9a84c'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor = '#333'
                  handleFieldBlur('message')
                }}
              />
            </FormField>

            {/* Error message */}
            <AnimatePresence>
              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                  }}
                >
                  <p style={{ color: '#f87171', fontSize: '14px' }}>
                    {errorMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div style={{ paddingTop: '8px' }}>
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                style={{
                  width: '100%',
                  background: '#c9a84c',
                  color: '#000',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '14px 40px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: formStatus === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: formStatus === 'loading' ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => {
                  if (formStatus !== 'loading') {
                    e.currentTarget.style.backgroundColor = '#d4b45c'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#c9a84c'
                }}
              >
                {formStatus === 'loading' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(0, 0, 0, 0.2)',
                        borderTop: '2px solid #000',
                        borderRadius: '50%',
                      }}
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send Inquiry'
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>

      {/* Mobile responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .name-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}