import CompareFloatingBar from '@/components/layouts/CompareFloatingBar';
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
      <main className="min-h-screen flex flex-col">{children}</main>
      <Footer />
      <CompareFloatingBar />
    </>
  );
}
