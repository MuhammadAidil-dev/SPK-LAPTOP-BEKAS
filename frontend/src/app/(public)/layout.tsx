import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';

export default function PublicLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col p-12">{children}</main>
      <Footer />
    </>
  );
}
