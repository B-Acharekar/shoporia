'use client';

import { useState, useEffect } from 'react';
import { showToast } from '@/lib/toast';
import { useCart } from '@/context/CartContext';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

type FormFields = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  country: string;
  paymentMethod: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  upiId: string;
  paypalEmail: string;
};

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState<FormFields>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    country: '',
    paymentMethod: 'cod',
    cardNumber: '',
    expiry: '',
    cvv: '',
    upiId: '',
    paypalEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const currency = cart[0]?.currency || 'USD';

  useEffect(() => {
    // Generate order ID and estimated delivery date
    setOrderId('ORD-' + uuidv4().slice(0, 8).toUpperCase());
    const date = new Date();
    date.setDate(date.getDate() + 5 + Math.floor(Math.random() * 3));
    setDeliveryDate(date.toDateString());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const simulatePayment = async () => {
    const res = await fetch('https://reqres.in/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: form.paymentMethod,
        amount: total,
        user: { name: form.fullName, email: form.email },
        card: { number: form.cardNumber, expiry: form.expiry, cvv: form.cvv },
        upi: { id: form.upiId },
        paypal: { email: form.paypalEmail },
      }),
    });

    if (!res.ok) throw new Error('Fake payment failed');
    return res.json();
  };

  const saveOrder = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        deliveryDate,
        user: form,
        items: cart,
        total,
        status: 'confirmed',
        paid: form.paymentMethod !== 'cod',
      }),
    });
  };

  const handlePlaceOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('error', 'Your cart is empty.');
      return;
    }

    setLoading(true);
    showToast('info', 'Processing your order...');

    try {
      if (form.paymentMethod !== 'cod') await simulatePayment();
      await saveOrder();
      showToast(
        'success',
        `Order ${orderId} placed! Est. delivery: ${deliveryDate}`
      );
      clearCart();
      router.push('/shop');
    } catch (error: unknown) {
      showToast('error', 'Payment failed. Please try again.');

      if (error instanceof Error) {
        console.error('Payment error:', error.message);
      } else {
        console.error('Unknown payment error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="mb-8 border p-4 rounded-xl bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span>{item.title} × {item.quantity}</span>
              <span>{item.currency} {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span>{currency} {total.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'fullName', placeholder: 'Full Name' },
          { name: 'email', placeholder: 'Email', type: 'email' },
          { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
          { name: 'address', placeholder: 'Address' },
          { name: 'city', placeholder: 'City' },
          { name: 'pincode', placeholder: 'Pincode' },
          { name: 'country', placeholder: 'Country' },
        ].map(({ name, placeholder, type = 'text' }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={form[name as keyof FormFields]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            required
          />
        ))}

        {/* Payment */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit / Debit Card</option>
            <option value="upi">UPI</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {/* Dynamic Payment Fields */}
        {form.paymentMethod === 'card' && (
          <>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={form.cardNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3"
              required
            />
            <input
              type="text"
              name="expiry"
              placeholder="Expiry Date (MM/YY)"
              value={form.expiry}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3"
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={form.cvv}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3"
              required
            />
          </>
        )}

        {form.paymentMethod === 'upi' && (
          <input
            type="text"
            name="upiId"
            placeholder="Enter UPI ID"
            value={form.upiId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 col-span-1 md:col-span-2"
            required
          />
        )}

        {form.paymentMethod === 'paypal' && (
          <input
            type="email"
            name="paypalEmail"
            placeholder="PayPal Email"
            value={form.paypalEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 col-span-1 md:col-span-2"
            required
          />
        )}

        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
