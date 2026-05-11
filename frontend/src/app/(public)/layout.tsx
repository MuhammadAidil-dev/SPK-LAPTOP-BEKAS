export default function PublicLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <main className="min-h-screen flex flex-col p-8">{children}</main>;
}
