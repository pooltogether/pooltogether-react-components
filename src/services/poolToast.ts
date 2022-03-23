import { toast } from 'react-toastify'

export const poolToast = {
  dismiss: () => {
    toast.dismiss()
  },
  rainbow: (message, options) => {
    toast.dismiss()
    toast(message, options)

    if (window) {
      setTimeout(toast.dismiss, 7000)
    }
  },
  success: (message, options) => {
    toast.dismiss()
    toast.success(message, options)
  },
  error: (message, options) => {
    toast.dismiss()
    toast.error(message, options)
  },
  info: (message, options) => {
    toast.dismiss()
    toast.info(message, options)
  },
  warn: (message, options) => {
    toast.dismiss()
    toast.warn(message, options)
  }
}
