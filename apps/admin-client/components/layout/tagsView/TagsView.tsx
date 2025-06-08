export default function TagsView({ children }: { children: any }) {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-full">{children}</div>
    </div>
  )
}
