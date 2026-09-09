export default function AdminConfirmModal({ message, onConfirm, onCancel, submitting = false }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" role="alertdialog" aria-modal="true" aria-labelledby="admin-confirm-title">
      <div className="w-full max-w-sm rounded-2xl bg-[#FAF8F5] p-6 shadow-2xl">
        <h2 id="admin-confirm-title" className="font-serif text-xl font-bold text-[#033327]">Confirm action</h2>
        <p className="mt-3 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} disabled={submitting} className="rounded-lg border border-[#e5e1d8] bg-white px-4 py-2 text-[11px] font-bold text-gray-600 disabled:opacity-50">Cancel</button>
          <button type="button" onClick={onConfirm} disabled={submitting} className="rounded-lg bg-red-700 px-4 py-2 text-[11px] font-bold text-white disabled:opacity-50">{submitting ? 'Deleting…' : 'Delete'}</button>
        </div>
      </div>
    </div>
  )
}
