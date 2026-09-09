import { useEffect, useState } from 'react'

export default function AdminFormModal({
  title,
  fields,
  initialValues = {},
  onSubmit,
  onClose,
  submitting = false,
  error = '',
}) {
  const normalizeValue = (field, value) => {
    if (field.type === 'datetime-local' && value) return String(value).slice(0, 16)
    if (field.type === 'select' && value && typeof value === 'object') {
      return String(value._id ?? value.id ?? '')
    }
    if (field.type === 'select' && value !== undefined && value !== null && value !== '') {
      return String(value)
    }
    return value
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

  // Reset only when opening a different record / add form, not on every parent re-render.
  const resetKey = `${title}:${initialValues?._id ?? 'new'}`
  useEffect(() => {
    setValues(buildValues())
    setErrors({})
  }, [resetKey])

  const update = (name, value) => setValues((current) => ({ ...current, [name]: value }))

  const optionValue = (option) => String(option?.value ?? option ?? '')

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    fields.forEach((field) => {
      const value = values[field.name]
      const isBlank =
        value === undefined ||
        value === null ||
        (typeof value === 'string' && !value.trim())
      if (field.required && isBlank) nextErrors[field.name] = `${field.label} is required.`
      if (!isBlank && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        nextErrors[field.name] = 'Enter a valid email address.'
      }
      if (!isBlank && field.type === 'url') {
        try {
          new URL(value)
        } catch {
          nextErrors[field.name] = 'Enter a valid URL.'
        }
      }
      if (!isBlank && field.type === 'number' && !Number.isFinite(Number(value))) {
        nextErrors[field.name] = 'Enter a valid number.'
      }
      if (!isBlank && field.min !== undefined && Number(value) < field.min) {
        nextErrors[field.name] = `${field.label} must be at least ${field.min}.`
      }
      if (!isBlank && field.max !== undefined && Number(value) > field.max) {
        nextErrors[field.name] = `${field.label} must be at most ${field.max}.`
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
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const submittedValues = Object.fromEntries(
      fields.map((field) => {
        let value = values[field.name]
        if (value === '' && field.emptyValue !== undefined) {
          value = field.emptyValue
        } else if (value === '' && !field.required) {
          value =
            field.type === 'number' || field.type === 'select' || field.type === 'datetime-local'
              ? null
              : value
        }
        return [field.name, value]
      }),
    )
    onSubmit(submittedValues)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={handleSubmit}
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

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
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
                      className="mt-1 w-full rounded-lg border border-[#e5e1d8] bg-white px-3 py-2 text-sm font-normal outline-none focus:border-[#033327]"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={values[field.name] ?? ''}
                      onChange={(e) => update(field.name, e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[#e5e1d8] bg-white px-3 py-2 text-sm font-normal outline-none focus:border-[#033327]"
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
                      type={field.type || 'text'}
                      step={field.step}
                      min={field.min}
                      max={field.max}
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
                      className="mt-1 w-full rounded-lg border border-[#e5e1d8] bg-white px-3 py-2 text-sm font-normal outline-none focus:border-[#033327]"
                    />
                  )}
                  {errors[field.name] && (
                    <span className="mt-1 block text-[10px] font-normal text-red-600">
                      {errors[field.name]}
                    </span>
                  )}
                </>
              )}
            </label>
          ))}
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
