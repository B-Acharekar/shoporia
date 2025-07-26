'use client';

import { useState } from 'react';

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
};

export default function CheckoutPage() {
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Order placed:', form);
    alert('Order placed!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
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

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Card</option>
          </select>
        </div>

        {form.paymentMethod === 'card' && (
          <>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={form.cardNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
            <input
              type="text"
              name="expiry"
              placeholder="Expiry Date (MM/YY)"
              value={form.expiry}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={form.cvv}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
          </>
        )}

        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            onClick={handlePlaceOrder}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
