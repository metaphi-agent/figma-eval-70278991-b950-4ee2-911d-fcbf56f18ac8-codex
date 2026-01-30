import type { InputHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
  trailing?: ReactNode
}

export function TextField({
  className,
  label,
  hint,
  error,
  trailing,
  id,
  ...props
}: TextFieldProps) {
  const describedById = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <label className="w-full">
      {label ? (
        <div className="mb-2 px-4 text-[11px] leading-3 tracking-[0.3px] font-[400] text-[var(--color-black-800)]">
          {label}
        </div>
      ) : null}

      <div
        className={clsx(
          'flex h-12 w-full items-center justify-between rounded-[6px] border border-[var(--color-black-100)] bg-[var(--color-black-50)] px-4 pr-2',
          'focus-within:border-[var(--color-system-blue)] focus-within:ring-1 focus-within:ring-[var(--color-system-blue)]',
          error && 'border-[var(--color-system-red)] focus-within:border-[var(--color-system-red)] focus-within:ring-[var(--color-system-red)]',
          className
        )}
      >
        <input
          id={id}
          className={clsx(
            'w-full bg-transparent text-[15px] leading-5 text-[var(--color-black-900)] outline-none placeholder:text-[var(--color-black-500)]',
            trailing && 'pr-4'
          )}
          aria-invalid={!!error}
          aria-describedby={describedById}
          {...props}
        />
        {trailing ? <div className="shrink-0 pl-2">{trailing}</div> : null}
      </div>

      {error ? (
        <div
          id={`${id}-error`}
          className="mt-2 px-4 text-[12px] leading-5 text-[var(--color-system-red)]"
        >
          {error}
        </div>
      ) : hint ? (
        <div
          id={`${id}-hint`}
          className="mt-2 px-4 text-[12px] leading-5 text-[var(--color-black-600)]"
        >
          {hint}
        </div>
      ) : null}
    </label>
  )
}

