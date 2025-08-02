'use client';

import { AuthProvider } from '@/context/AuthContext'; 
import { CartProvider } from './CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
  <AuthProvider>
    <CartProvider>
    {children}
    </CartProvider>
    </AuthProvider>);
}
