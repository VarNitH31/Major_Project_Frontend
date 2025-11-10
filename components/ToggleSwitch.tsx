'use client'

import React from 'react'

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ToggleSwitch({
  checked,
  onChange,
  label = '',
  size = 'md',
  className = '',
}: ToggleSwitchProps) {
  const sizes = {
    sm: { track: 'w-10 h-5', knob: 'h-4 w-4' },
    md: { track: 'w-14 h-8', knob: 'h-7 w-7' },
    lg: { track: 'w-16 h-9', knob: 'h-8 w-8' },
  }
  const s = sizes[size]

  const handleToggle = () => {
    onChange(!checked)
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={`relative inline-flex flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${checked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'} ${s.track}`}
      >
        <span
          aria-hidden="true"
          className={`inline-block transform bg-white rounded-full shadow transition-transform duration-200 ${s.knob}
            ${checked ? 'translate-x-[calc(100%+6px)]' : 'translate-x-1'}`}
          style={{ boxShadow: '0 2px 8px rgba(2,6,23,0.08)' }}
        />
      </button>

      {label ? (
        <span className={`select-none text-sm font-medium ${checked ? 'text-slate-100' : 'text-slate-800 dark:text-slate-300'}`}>
          {label}
        </span>
      ) : null}
    </div>
  )
}