import clsx from 'clsx'
import { ReactNode } from 'react'

interface ItemProps {
  isActive?: boolean
  children: ReactNode
}

export function Item({ isActive = false, children }: ItemProps) {
  const Comp = isActive ? 'span' : 'a'

  return (
    <Comp
      href="#"
      className={clsx('inline-flex items-center gap-2 hover:text-rotion-50', {
        'text-rotion-50': isActive,
      })}
    >
      {children}
    </Comp>
  )
}
