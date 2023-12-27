

export function FormTextField({ name, label, required, error }: { name: string, label: string, required?: boolean, error?: string }) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label className="text-sm font-semibold" htmlFor={name}>{label}</label>
      <input
        name={name}
        type="text"
        className=" px-4 py-3 rounded border border-zinc-700 bg-transparent"
        required={required}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}