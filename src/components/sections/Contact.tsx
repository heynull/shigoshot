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
      {/* Label */}
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

      {/* Input wrapper */}
      <div className="relative">
        {children}

        {/* Bottom underline - animates on focus/touch */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isTouched ? 1 : 0, opacity: error ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Error line flash */}
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

      {/* Error message */}
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
            marginBottom: '48px',
            lineHeight: 1.7,
          }}
        >
          Tell us about your project and we'll get back to you within 48 hours.
        </p>

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
                {/* Hidden input for form */}
                <input
                  type="hidden"
                  {...register('projectType')}
                  value={selectedProject}
                />

                {/* Dropdown trigger */}
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
                  {/* Chevron */}
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

                {/* Dropdown menu */}
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
