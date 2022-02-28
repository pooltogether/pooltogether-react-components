import { toast as toastify, cssTransition } from 'react-toastify'

const Blur = cssTransition({
  enter: `blur-enter`,
  exit: `blur-exit`,
  appendPosition: true
})

const DEFAULT_OPTIONS = {
  transition: Blur
}

export const toast = {
  dismiss: () => {
    toastify.dismiss()
  },
  rainbow: (message, options = DEFAULT_OPTIONS) => {
    toastify.dismiss()
    toastify(message, options)

    if (window) {
      setTimeout(toastify.dismiss, 7000)
    }
  },
  success: (message, options = DEFAULT_OPTIONS) => {
    toastify.dismiss()
    toast.success(message, options)
  },
  error: (message, options = DEFAULT_OPTIONS) => {
    toastify.dismiss()
    toastify.error(message, options)
  },
  info: (message, options = DEFAULT_OPTIONS) => {
    toastify.dismiss()
    toastify.info(message, options)
  },
  warn: (message, options = DEFAULT_OPTIONS) => {
    toastify.dismiss()
    toastify.warn(message, options)
  }
}
