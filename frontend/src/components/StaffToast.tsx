import { useCallback, useState } from 'react'

type ToastType = 'success' | 'error'

export function useStaffToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  const show = useCallback((message: string, type: ToastType) => {
    setToast({ message, type })
    window.setTimeout(() => setToast(null), 3000)
  }, [])

  const showSuccess = useCallback((message: string) => show(message, 'success'), [show])
  const showError = useCallback((message: string) => show(message, 'error'), [show])

  const Toast = () =>
    toast ? (
      <div
        className={`staff-toast ${toast.type === 'success' ? 'staff-toast-success' : 'staff-toast-error'}`}
        role="status"
      >
        {toast.message}
      </div>
    ) : null

  return { showSuccess, showError, Toast }
}
