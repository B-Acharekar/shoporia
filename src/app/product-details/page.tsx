import { Suspense } from 'react';
import ProductDetailsClient from '@/components/ProductDetailsClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-16">Loading product...</div>}>
      <ProductDetailsClient />
    </Suspense>
  );
}
