import { useEffect, useState } from 'react'

export default function AdminFormModal({ title, fields, initialValues = {}, onSubmit, onClose, submitting = false }) {
  const normalizeValue = (field, value) => {
    if (field.type === 'datetime-local' && value) return String(value).slice(0, 16)
    if (field.type === 'select' && value && typeof value === 'object') return value._id ?? value.id ?? ''
    return value
  }
  const buildValues = () => Object.fromEntries(fields.map((field) => [field.name, normalizeValue(field, initialValues[field.name] ?? field.defaultValue ?? (field.type === 'checkbox' ? false : ''))]))
  const [values, setValues] = useState(buildValues)
  const [errors, setErrors] = useState({})
  useEffect(() => {
    setValues(buildValues())
  }, [initialValues])
  const update = (name, value) => setValues((current) => ({ ...current, [name]: value }))
  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    fields.forEach((field) => {
      const value = values[field.name]
      const isBlank = value === undefined || value === null || (typeof value === 'string' && !value.trim())
      if (field.required && isBlank) nextErrors[field.name] = `${field.label} is required.`
      if (!isBlank && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        nextErrors[field.name] = 'Enter a valid email address.'
      }
      if (!isBlank && field.type === 'url') {
        try { new URL(value) } catch { nextErrors[field.name] = 'Enter a valid URL.' }
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
      if (!isBlank && field.options && !field.options.some((option) => (option.value ?? option) === value)) {
        nextErrors[field.name] = `Select a valid ${field.label.toLowerCase()}.`
      }
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    const submittedValues = Object.fromEntries(fields.map((field) => [
      field.name,
      values[field.name] === '' && field.emptyValue !== undefined ? field.emptyValue : values[field.name],
    ]))
    onSubmit(submittedValues)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <form onSubmit={handleSubmit} className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAF8F5] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-[#033327]">{title}</h2>
          <button type="button" onClick={onClose} className="text-2xl text-gray-400 hover:text-[#033327]" aria-label="Close">×</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2 text-[11px] font-bold text-gray-600' : field.type === 'checkbox' ? 'flex items-center gap-2 text-[11px] font-bold text-gray-600' : 'text-[11px] font-bold text-gray-600'}>
              {field.type === 'checkbox' ? (
                <>
                  <input type="checkbox" checked={Boolean(values[field.name])} onChange={(e) => update(field.name, e.target.checked)} className="h-4 w-4 accent-[#033327]" />
                  <span>{field.label}</span>
                </>
              ) : (
                <>
              {field.label}{field.required && <span className="text-red-500"> *</span>}
              {field.type === 'textarea' ? (
                <textarea required={field.required} value={values[field.name]} onChange={(e) => update(field.name, e.target.value)} rows={4} className="mt-1 w-full rounded-lg border border-[#e5e1d8] bg-white px-3 py-2 text-sm font-normal outline-none focus:border-[#033327]" />
              ) : field.type === 'select' ? (
                <select required={field.required} value={values[field.name]} onChange={(e) => update(field.name, e.target.value)} className="mt-1 w-full rounded-lg border border-[#e5e1d8] bg-white px-3 py-2 text-sm font-normal outline-none focus:border-[#033327]">
                  <option value="">Select…</option>
                  {field.options.map((option) => <option key={option.value ?? option} value={option.value ?? option}>{option.label ?? option}</option>)}
                </select>
              ) : (
                <input required={field.required} type={field.type || 'text'} step={field.step} min={field.min} max={field.max} value={values[field.name]} onChange={(e) => update(field.name, field.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)} className="mt-1 w-full rounded-lg border border-[#e5e1d8] bg-white px-3 py-2 text-sm font-normal outline-none focus:border-[#033327]" />
              )}
              {errors[field.name] && <span className="mt-1 block text-[10px] font-normal text-red-600">{errors[field.name]}</span>}
                </>
              )}
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-lg border border-[#e5e1d8] bg-white px-4 py-2 text-[11px] font-bold text-gray-600">Cancel</button>
          <button disabled={submitting} className="rounded-lg bg-[#033327] px-4 py-2 text-[11px] font-bold text-white disabled:opacity-50">{submitting ? 'Saving…' : 'Save entry'}</button>
        </div>
      </form>
    </div>
  )
}
