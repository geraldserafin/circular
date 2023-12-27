"use client"

import Link from "next/link"
import { useFormStatus } from "react-dom"

type ButtonProps =
  { children: React.ReactNode }
  & (
    { role: "link", href: string }
    | { role: "button" | "submit", onClick?: () => void, disabled?: boolean }
  )

export function Button(props: ButtonProps) {
  if (props.role == "link") {
    return (
      <Link
        className="w-full px-4 py-3 bg-green-700 text-sm font-semibold dark:text-neutral-200 rounded text-center"
        href={props.href}
      >
        {props.children}
      </Link>
    )
  }

  const { pending } = useFormStatus();

  return (
    <button
      className={`w-full px-4 py-3 bg-green-700 text-sm font-semibold dark:text-neutral-200 rounded ${props.disabled || pending ? "bg-neutral-600" : ""}`}
      disabled={props.disabled ?? false}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}