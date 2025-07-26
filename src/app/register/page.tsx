'use client';

import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

const RegisterPage = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 mt-15  rounded-xl shadow-md w-full max-w-md">
                <AuthForm type="register" />
                <p className="text-sm text-center text-zinc-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </section>
    );
};

export default RegisterPage;
