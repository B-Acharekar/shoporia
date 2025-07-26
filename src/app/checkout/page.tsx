'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
};

const randomQR = () =>
  `https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=example@upi&amount=${Math.floor(
    Math.random() * 900 + 100
  )}&size=200x200`;

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({
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
  });
  const router = useRouter();
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    try {
      const parsed = JSON.parse(saved || '[]');
      if (Array.isArray(parsed)) setCart(parsed);
    } catch {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    if (form.paymentMethod === 'upi') {
      setQrUrl(randomQR());
    }
  }, [form.paymentMethod]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.pincode
    ) {
      alert('Please fill all required fields.');
      return;
    }

    if (form.paymentMethod === 'card') {
      if (!form.cardNumber || !form.expiry || !form.cvv) {
        alert('Please enter full card details.');
        return;
      }
    }

    alert('Order placed successfully (mock)!');
    localStorage.removeItem('cart');
    setCart([]);
    router.push('/home');
  };

  return (
    <div className="bg-white min-h-screen w-full font-sans">
      <main className="max-w-5xl mx-auto py-20 px-6 text-gray-900">
        {/* Back */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-gray-600 hover:text-black hover:underline text-sm transition"
          >
            <HiOutlineArrowNarrowLeft className="text-base" />
            Back to Cart
          </button>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-semibold mb-10 tracking-tight">Checkout</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">No items in cart.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Shipping Form */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-2">Shipping & Contact</h2>

              {[
                { name: 'fullName', placeholder: 'Full Name' },
                { name: 'email', placeholder: 'Email', type: 'email' },
                { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                { name: 'address', placeholder: 'Address' },
                { name: 'country', placeholder: 'Country' },
              ].map(({ name, placeholder, type = 'text' }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
                  required
                />
              ))}

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
                  required
                />
              </div>

              {/* Payment Method */}
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="upi">UPI / Google Pay</option>
                <option value="card">Credit / Debit Card</option>
              </select>

              {/* Conditional Payment Fields */}
              {form.paymentMethod === 'upi' && (
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Scan this QR to pay securely
                  </p>
                  <img
                    src={qrUrl}
                    alt="UPI QR"
                    className="mx-auto w-40 h-40 border rounded-lg"
                  />
                </div>
              )}

              {form.paymentMethod === 'card' && (
                <div className="space-y-4 pt-2">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={form.cardNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3"
                    maxLength={19}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3"
                      maxLength={5}
                    />
                    <input
                      type="password"
                      name="cvv"
                      placeholder="CVV"
                      value={form.cvv}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3"
                      maxLength={4}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right: Order Summary */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-2">Order Summary</h2>

              <div className="space-y-4 rounded-xl border border-gray-200 p-6 bg-gray-50 shadow-sm">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity || 1} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="font-medium text-gray-700">
                      ${((item.quantity || 1) * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-200 text-xl font-semibold flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-black text-white text-lg font-medium px-6 py-3 rounded-full hover:bg-gray-800 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
