import type { ChangeEventHandler } from 'react'
import { clsx } from 'clsx'

export type SwitchProps = {
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  label: string
  id: string
}

export function Switch({ checked, onChange, label, id }: SwitchProps) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer">
      <span className="relative inline-flex h-5 w-10 items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span
          className={clsx(
            'absolute inset-0 rounded-full border border-[var(--color-black-100)] transition-colors duration-150',
            checked ? 'bg-[var(--color-system-green)]' : 'bg-[var(--color-black-50)]'
          )}
        />
        <span
          className={clsx(
            'absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-150',
            checked && 'translate-x-5'
          )}
        />
      </span>
      <span className="text-[12px] leading-5 tracking-[0.3px] text-[var(--color-black-900)]">
        {label}
      </span>
    </label>
  )
}
