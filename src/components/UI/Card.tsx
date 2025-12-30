import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'shadow'
}

export function Card({ children, variant = 'default', className = '', ...props }: CardProps) {
  const variants = {
    default: 'bg-white',
    bordered: 'bg-white border border-gray-200',
    shadow: 'bg-white shadow-lg'
  }

  return (
    <div 
      className={`rounded-lg p-6 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}