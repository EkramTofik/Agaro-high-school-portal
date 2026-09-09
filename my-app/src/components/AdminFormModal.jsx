import { useEffect, useRef, useState } from 'react'

const URL_NAME_HINTS = /^(https?:\/\/|www\.)/i

function isBlankValue(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && !value.trim()) ||
    (typeof value === 'number' && Number.isNaN(value))
  )
}

function isValidUrl(value) {
  const trimmed = String(value).trim()
  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    try {
      const parsed = new URL(`https://${trimmed}`)
      return URL_NAME_HINTS.test(trimmed) && Boolean(parsed.hostname.includes('.'))
    } catch {
      return false
    }
  }
}

export default function AdminFormModal({
  title,
  fields,
  initialValues = {},
  onSubmit,
  onClose,
  submitting = false,
  error = '',
}) {
  const firstErrorRef = useRef(null)

  const normalizeValue = (field, value) => {
    if (field.type === 'datetime-local' && value) {
      const raw = String(value)
      if (raw.includes('T')) return raw.slice(0, 16)
      return raw
    }
    if (field.type === 'select' && value && typeof value === 'object') {
      return String(value._id ?? value.id ?? '')
    }
    if (field.type === 'select' && value !== undefined && value !== null && value !== '') {
      return String(value)
    }
    if (field.type === 'number' && value !== undefined && value !== null && value !== '') {
      return Number(value)
    }
    if (field.type === 'checkbox') return Boolean(value)
    return value ?? ''
  }

  const buildValues = () =>
    Object.fromEntries(
      fields.map((field) => [
        field.name,
        normalizeValue(
          field,
          initialValues[field.name] ?? field.defaultValue ?? (field.type === 'checkbox' ? false : ''),
        ),
      ]),
    )

  const [values, setValues] = useState(buildValues)
  const [errors, setErrors] = useState({})

  const resetKey = `${title}:${initialValues?._id ?? 'new'}`
  useEffect(() => {
    setValues(buildValues())
    setErrors({})
  }, [resetKey])

  useEffect(() => {
    if (!Object.keys(errors).length) return
    firstErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [errors])

  const update = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const optionValue = (option) => String(option?.value ?? option ?? '')

  const fieldNeedsUrlCheck = (field) =>
    field.type === 'url' ||
    ['imageUrl', 'fileUrl', 'logoUrl', 'heroImageUrl', 'website'].includes(field.name)

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}

    fields.forEach((field) => {
      const value = values[field.name]
      const isBlank = isBlankValue(value)

      // If a matched pair field (e.g. password) has a value, confirmation is required.
      if (field.matchField) {
        const other = values[field.matchField]
        const otherBlank = isBlankValue(other)
        if (!otherBlank && isBlank) {
          nextErrors[field.name] = `${field.label} is required when ${field.matchField} is set.`
        } else if (!isBlank && !otherBlank && String(value) !== String(other)) {
          nextErrors[field.name] = `${field.label} does not match.`
        } else if (!isBlank && otherBlank) {
          nextErrors[field.matchField] =
            nextErrors[field.matchField] ||
            `${fields.find((f) => f.name === field.matchField)?.label || field.matchField} is required.`
        }
      }

      if (field.required && isBlank) {
        nextErrors[field.name] = `${field.label} is required.`
      }

      if (!isBlank && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())) {
        nextErrors[field.name] = 'Enter a valid email address.'
      }

      if (!isBlank && fieldNeedsUrlCheck(field) && !isValidUrl(value)) {
        nextErrors[field.name] = 'Enter a valid URL (http:// or https://).'
      }

      if (!isBlank && field.type === 'number') {
        const num = Number(value)
        if (!Number.isFinite(num)) {
          nextErrors[field.name] = 'Enter a valid number.'
        } else if (field.integer && !Number.isInteger(num)) {
          nextErrors[field.name] = `${field.label} must be a whole number.`
        } else if (field.min !== undefined && num < field.min) {
          nextErrors[field.name] = `${field.label} must be at least ${field.min}.`
        } else if (field.max !== undefined && num > field.max) {
          nextErrors[field.name] = `${field.label} must be at most ${field.max}.`
        }
      }

      if (!isBlank && field.minLength && String(value).trim().length < field.minLength) {
        nextErrors[field.name] = `${field.label} must be at least ${field.minLength} characters.`
      }

      if (!isBlank && field.maxLength && String(value).trim().length > field.maxLength) {
        nextErrors[field.name] = `${field.label} must be at most ${field.maxLength} characters.`
      }

      if (!isBlank && field.type === 'datetime-local') {
        const date = new Date(value)
        if (Number.isNaN(date.getTime())) {
          nextErrors[field.name] = 'Enter a valid date and time.'
        }
      }

      if (
        !isBlank &&
        Array.isArray(field.options) &&
        field.options.length > 0 &&
        !field.options.some((option) => optionValue(option) === String(value))
      ) {
        nextErrors[field.name] = `Select a valid ${field.label.toLowerCase()}.`
      }
    })

    // Cross-field: academic year range
    if (
      fields.some((f) => f.name === 'startYear') &&
      fields.some((f) => f.name === 'endYear') &&
      !isBlankValue(values.startYear) &&
      !isBlankValue(values.endYear) &&
      Number(values.endYear) < Number(values.startYear)
    ) {
      nextErrors.endYear = 'End year must be greater than or equal to start year.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const submittedValues = Object.fromEntries(
      fields
        .map((field) => {
          let value = values[field.name]

          if (typeof value === 'string') value = value.trim()

          if (value === '' && field.emptyValue !== undefined) {
            value = field.emptyValue
          } else if (value === '' && (!field.required || field.omitEmpty)) {
            if (field.omitEmpty) return null
            value =
              field.type === 'number' ||
              field.type === 'select' ||
              field.type === 'datetime-local' ||
              fieldNeedsUrlCheck(field)
                ? null
                : value
          }

          if (field.type === 'number' && value !== '' && value !== null && value !== undefined) {
            value = Number(value)
          }

          if (field.type === 'datetime-local' && value) {
            const date = new Date(value)
            value = Number.isNaN(date.getTime()) ? null : date.toISOString()
          }

          return [field.name, value]
        })
        .filter(Boolean),
    )

    onSubmit(submittedValues)
  }

  const errorList = Object.values(errors)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAF8F5] p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-[#033327]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-[#033327]"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>
        )}

        {errorList.length > 0 && (
          <p
            ref={firstErrorRef}
            className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700"
          >
            Please fix {errorList.length} field{errorList.length === 1 ? '' : 's'} before saving.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => {
            const hasError = Boolean(errors[field.name])
            const inputClass = `mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm font-normal outline-none focus:border-[#033327] ${
              hasError ? 'border-red-400' : 'border-[#e5e1d8]'
            }`

            return (
              <label
                key={field.name}
                className={
                  field.type === 'textarea'
                    ? 'sm:col-span-2 text-[11px] font-bold text-gray-600'
                    : field.type === 'checkbox'
                      ? 'flex items-center gap-2 text-[11px] font-bold text-gray-600'
                      : 'text-[11px] font-bold text-gray-600'
                }
              >
                {field.type === 'checkbox' ? (
                  <>
                    <input
                      type="checkbox"
                      checked={Boolean(values[field.name])}
                      onChange={(e) => update(field.name, e.target.checked)}
                      className="h-4 w-4 accent-[#033327]"
                    />
                    <span>{field.label}</span>
                    {hasError && (
                      <span className="text-[10px] font-normal text-red-600">{errors[field.name]}</span>
                    )}
                  </>
                ) : (
                  <>
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                    {field.type === 'textarea' ? (
                      <textarea
                        value={values[field.name] ?? ''}
                        onChange={(e) => update(field.name, e.target.value)}
                        rows={4}
                        className={inputClass}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={values[field.name] ?? ''}
                        onChange={(e) => update(field.name, e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select…</option>
                        {(field.options || []).map((option) => (
                          <option key={optionValue(option)} value={optionValue(option)}>
                            {option.label ?? option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type === 'url' ? 'url' : field.type || 'text'}
                        step={field.step ?? (field.integer ? 1 : field.type === 'number' ? 'any' : undefined)}
                        min={field.min}
                        max={field.max}
                        autoComplete={field.type === 'password' ? 'new-password' : undefined}
                        value={values[field.name] ?? ''}
                        onChange={(e) =>
                          update(
                            field.name,
                            field.type === 'number'
                              ? e.target.value === ''
                                ? ''
                                : Number(e.target.value)
                              : e.target.value,
                          )
                        }
                        className={inputClass}
                      />
                    )}
                    {hasError && (
                      <span className="mt-1 block text-[10px] font-normal text-red-600">
                        {errors[field.name]}
                      </span>
                    )}
                  </>
                )}
              </label>
            )
          })}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#e5e1d8] bg-white px-4 py-2 text-[11px] font-bold text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#033327] px-4 py-2 text-[11px] font-bold text-white disabled:opacity-50"
          >
            {submitting ? 'Saving…' : 'Save entry'}
          </button>
        </div>
      </form>
    </div>
  )
}
