'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { contactSchema, type ContactFormData } from '@/lib/contactSchema'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import Button from '@/components/ui/Button'
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
  isValid?: boolean
  children: React.ReactNode
}

function FormField({ label, fieldId, error, isTouched, isValid, children }: FormFieldProps) {
  const { prefersReducedMotion } = useReducedMotion()
  
  return (
    <div className="relative">
      {/* Label */}
      <label
        htmlFor={fieldId}
        className="block text-[10px] letter-spacing[0.3em] tracking-widest text-[#888] mb-2 font-montserrat font-light uppercase"
      >
        {label}
      </label>

      {/* Input/Textarea/Select wrapper */}
      <div className="relative">
        {children}
        
        {/* Bottom underline with center-to-sides animation */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isTouched ? 1 : 0, opacity: error ? 0 : 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Error line flash */}
        {error && isTouched && (
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-red-500 w-full"
            animate={{
              opacity: [1, 0.5, 1],
              boxShadow: [
                '0 0 0px rgba(239, 68, 68, 0)',
                '0 0 8px rgba(239, 68, 68, 0.4)',
                '0 0 0px rgba(239, 68, 68, 0)',
              ],
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>

      {/* Error Message with slide-down animation */}
      <AnimatePresence>
        {error && isTouched && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="text-red-400/80 text-xs mt-1 font-montserrat"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Valid checkmark with fade-in */}
      {isValid && isTouched && !error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[#c9a84c] text-sm"
        >
          ✓
        </motion.div>
      )}
    </div>
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
    formState: { errors, isSubmitting },
    reset,
    watch,
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

      // Reset success state after 5 seconds
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.project-type-dropdown')) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // SVG Success Checkmark Component
  function SuccessCheckmark() {
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
        {/* Circle */}
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
        {/* Checkmark */}
        <motion.path
          d="M 20 32 L 28 40 L 44 24"
          stroke="#c9a84c"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.3, ease: 'easeOut' }}
        />
      </motion.svg>
    )
  }

  return (
    <section className="w-full px-6 py-16 tablet:px-12 tablet:py-20 lg:px-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col tablet:grid tablet:grid-cols-2 gap-3">
          {/* Left: Studio Info */}
          <RevealOnScroll>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            >
              <h2 className="font-garamond font-light text-cream mb-6 text-fluid-section-title">
                Let's Create
                <span className="text-gold italic"> Something</span>
                <br />
                Extraordinary
              </h2>

              <p className="font-montserrat text-base font-light text-muted mb-12 leading-relaxed">
                Whether you have a clear vision or need creative guidance, we're here to bring your
                story to life. Get in touch with our team and let's discuss your project.
              </p>

              <div className="space-y-8">
                {/* Email */}
                <div>
                  <p className="font-montserrat text-xs font-light text-gold uppercase tracking-widest mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:hello@elenaram.com"
                    className="font-garamond text-lg font-light text-cream hover:text-gold transition-colors"
                  >
                    hello@elenaram.com
                  </a>
                </div>

                {/* Location */}
                <div>
                  <p className="font-montserrat text-xs font-light text-gold uppercase tracking-widest mb-2">
                    Location
                  </p>
                  <p className="font-garamond text-lg font-light text-cream">
                    Los Angeles, California
                  </p>
                </div>

                {/* Timeline */}
                <div>
                  <p className="font-montserrat text-xs font-light text-gold uppercase tracking-widest mb-2">
                    Booking Timeline
                  </p>
                  <p className="font-garamond text-lg font-light text-cream">
                    Contact us 2-3 months in advance for optimal scheduling
                  </p>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>

          {/* Right: Contact Form */}
          <RevealOnScroll>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            >
              {/* Success State */}
              {formStatus === 'success' && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
                >
                  <SuccessCheckmark />
                  
                  <motion.p
                    className="font-garamond text-fluid-body text-cream mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
                  >
                    Message sent. We'll be in touch within 48 hours.
                  </motion.p>

                  <motion.button
                    onClick={() => setFormStatus('idle')}
                    className="font-montserrat text-xs text-gold uppercase tracking-widest hover:text-cream transition-colors"
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
                  className="flex flex-col gap-7"
                  animate={{ opacity: formStatus === 'loading' ? 0.5 : 1 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                >
                  {/* First & Last Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* First Name */}
                    <FormField
                      label="First Name"
                      fieldId="firstName"
                      error={errors.firstName?.message}
                      isTouched={touchedFields.firstName}
                      isValid={!!formValues.firstName && !errors.firstName}
                    >
                      <input
                        id="firstName"
                        {...register('firstName')}
                        type="text"
                        placeholder=""
                        onBlur={() => handleFieldBlur('firstName')}
                        className="w-full bg-transparent border-0 border-b border-[#333] pb-3 pt-0 font-montserrat text-base font-light text-white placeholder-muted/40 focus-visible:outline-none transition-colors"
                      />
                    </FormField>

                    {/* Last Name */}
                    <FormField
                      label="Last Name"
                      fieldId="lastName"
                      error={errors.lastName?.message}
                      isTouched={touchedFields.lastName}
                      isValid={!!formValues.lastName && !errors.lastName}
                    >
                      <input
                        id="lastName"
                        {...register('lastName')}
                        type="text"
                        placeholder=""
                        onBlur={() => handleFieldBlur('lastName')}
                        className="w-full bg-transparent border-0 border-b border-[#333] pb-3 pt-0 font-montserrat text-base font-light text-white placeholder-muted/40 focus-visible:outline-none transition-colors"
                      />
                    </FormField>
                  </div>

                  {/* Email */}
                  <FormField
                    label="Email Address"
                    fieldId="email"
                    error={errors.email?.message}
                    isTouched={touchedFields.email}
                    isValid={!!formValues.email && !errors.email}
                  >
                    <input
                      id="email"
                      {...register('email')}
                      type="email"
                      placeholder=""
                      onBlur={() => handleFieldBlur('email')}
                      className="w-full bg-transparent border-0 border-b border-[#333] pb-3 pt-0 font-montserrat text-base font-light text-white placeholder-muted/40 focus-visible:outline-none transition-colors"
                    />
                  </FormField>

                  {/* Project Type - Custom Dropdown */}
                  <FormField
                    label="Project Type"
                    fieldId="projectType"
                    error={errors.projectType?.message}
                    isTouched={touchedFields.projectType}
                    isValid={!!selectedProject && !errors.projectType}
                  >
                    <div 
                      ref={dropdownRef}
                      className="project-type-dropdown relative"
                      style={{ position: 'relative' }}
                    >
                      {/* Hidden input to work with react-hook-form */}
                      <input
                        type="hidden"
                        {...register('projectType')}
                        value={selectedProject}
                      />

                      {/* Dropdown Trigger Button */}
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
                          color: selectedProject ? 'white' : '#555',
                          padding: '12px 0',
                          fontSize: '14px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontFamily: 'Montserrat',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        <span>
                          {selectedProject
                            ? projectTypes.find(t => t.value === selectedProject)?.label
                            : 'Select a project type'}
                        </span>
                        {/* Animated chevron arrow */}
                        <motion.span
                          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ color: '#c9a84c', fontSize: '12px', marginLeft: '8px' }}
                        >
                          ▼
                        </motion.span>
                      </button>

                      {/* Animated Dropdown Options */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
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
                              marginTop: '4px',
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
                                  setIsDropdownOpen(false)
                                  handleFieldBlur('projectType')
                                }}
                                style={{
                                  width: '100%',
                                  background: selectedProject === type.value
                                    ? 'rgba(201,168,76,0.1)'
                                    : 'transparent',
                                  border: 'none',
                                  borderBottom: index < projectTypes.length - 1
                                    ? '1px solid #222'
                                    : 'none',
                                  color: selectedProject === type.value ? '#c9a84c' : '#ccc',
                                  padding: '14px 16px',
                                  fontSize: '13px',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  transition: 'background 0.2s ease, color 0.2s ease',
                                  fontFamily: 'Montserrat',
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

                  {/* Message */}
                  <FormField
                    label="Message"
                    fieldId="message"
                    error={errors.message?.message}
                    isTouched={touchedFields.message}
                    isValid={!!formValues.message && !errors.message}
                  >
                    <textarea
                      id="message"
                      {...register('message')}
                      placeholder=""
                      onBlur={() => handleFieldBlur('message')}
                      className="w-full bg-transparent border-0 border-b border-[#333] pb-3 pt-0 font-montserrat text-base font-light text-white placeholder-muted/40 focus-visible:outline-none resize-none"
                      style={{ minHeight: '100px' }}
                    />
                  </FormField>

                  {/* Error Message */}
                  <AnimatePresence>
                    {formStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-red-500/10 border border-red-500/30 rounded-sm p-3"
                      >
                        <p className="font-montserrat text-sm text-red-400">{errorMessage}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full md:w-auto bg-[#c9a84c] text-black px-10 py-3.5 rounded-full font-montserrat text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#d4b45c] active:scale-95 disabled:opacity-50"
                    >
                      {formStatus === 'loading' ? 'Sending...' : 'Send Inquiry'}
                    </button>
                  </div>
                </motion.form>
              )}
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
