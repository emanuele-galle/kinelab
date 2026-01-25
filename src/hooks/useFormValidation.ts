import { useState, useCallback } from 'react'

interface ValidationRules {
  [key: string]: {
    required?: boolean
    pattern?: RegExp
    minLength?: number
    maxLength?: number
  }
}

export function useFormValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validate = useCallback((name: string, value: string): string | null => {
    const rule = rules[name]
    if (!rule) return null

    if (rule.required && !value.trim()) {
      return 'Questo campo è obbligatorio'
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      if (name === 'email') return 'Email non valida'
      if (name === 'phone') return 'Telefono non valido (es. 3401234567)'
      return 'Formato non valido'
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `Minimo ${rule.minLength} caratteri`
    }

    return null
  }, [rules])

  const handleChange = useCallback((name: string, value: string) => {
    if (touched[name]) {
      const error = validate(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [touched, validate])

  const handleBlur = useCallback((name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validate(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [validate])

  const validateAll = useCallback((values: Record<string, string>) => {
    const newErrors: Record<string, string | null> = {}
    let isValid = true

    Object.keys(rules).forEach(name => {
      const error = validate(name, values[name] || '')
      newErrors[name] = error
      if (error) isValid = false
    })

    setErrors(newErrors)
    setTouched(Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
    return isValid
  }, [rules, validate])

  return { errors, touched, handleChange, handleBlur, validateAll }
}
