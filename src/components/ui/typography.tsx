import type React from 'react'
import type { CSSProperties } from 'react'
import { cn } from '~/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}

export function TypographyH1({ children, className }: Props) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className,
      )}
    >
      {children}
    </h1>
  )
}

export function TypographyH2({ children, className }: Props) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function TypographyH3({ children, className }: Props) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h3>
  )
}

export function TypographyH4({ children, className }: Props) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h4>
  )
}

export function TypographyP({ children, className }: Props) {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  )
}

export function TypographyBlockquote({ children, className }: Props) {
  return (
    <blockquote className={cn('mt-6 pl-6 italic', className)}>
      {children}
    </blockquote>
  )
}

export function TypographyList({
  children,
  className,
  type = 'unordered',
}: Props & {
  type?: 'ordered' | 'unordered'
}) {
  const Comp = type === 'ordered' ? 'ol' : 'ul'
  return (
    <Comp
      className={cn(
        'my-6 ml-6 [&>li]:mt-2',
        type === 'ordered' ? 'list-decimal' : 'list-disc',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

export function TypographyInlineCode({ children, className }: Props) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
    >
      {children}
    </code>
  )
}

export function TypographyLead({ children, className }: Props) {
  return (
    <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>
  )
}

export function TypographyLarge({ children, className }: Props) {
  return (
    <div className={cn('text-lg font-semibold', className)}>{children}</div>
  )
}

export function TypographySmall({ children, className, style }: Props) {
  return (
    <small
      className={cn('text-sm font-medium leading-none', className)}
      style={style}
    >
      {children}
    </small>
  )
}

export function TypographyMuted({ children, className, style }: Props) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} style={style}>
      {children}
    </p>
  )
}
