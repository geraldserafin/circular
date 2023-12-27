

export function Highlighted({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-2 transition-all hover:dark:bg-neutral-400/15 cursor-pointer rounded">
      {children}
    </div>
  )
}