import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/context/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shoporia – Premium Store',
  description: 'Mock e-commerce app built in Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <Providers>
          <Navbar />
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 3000, // auto dismiss in 3s
              className: "shadow-lg rounded-xl font-medium",
              style: {
                background: "#111827", // dark gray
                color: "#fff",
                border: "1px solid #1f2937",
                padding: "12px 16px",
              },
            }}
          />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
