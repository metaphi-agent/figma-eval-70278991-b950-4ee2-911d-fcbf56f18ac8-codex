import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'md'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-[6px] transition-colors duration-150 select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-system-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        size === 'md' && 'h-10 px-6 text-[15px] leading-5 font-bold tracking-[0.3px]',
        variant === 'primary' &&
          clsx(
            'bg-[var(--color-system-blue)] text-white',
            !isDisabled && 'hover:bg-[#0a84ff] active:bg-[#0061cc]'
          ),
        variant === 'secondary' &&
          clsx(
            'bg-[var(--color-black-800)] text-white',
            !isDisabled && 'hover:bg-[#2b2b2b] active:bg-[#1f1f1f]'
          ),
        isDisabled && 'opacity-60 cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? 'Signing in…' : children}
    </button>
  )
}

