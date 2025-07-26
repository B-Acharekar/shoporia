'use client';

import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
            <div className="max-w-md w-full p-8 space-y-6 border rounded-lg shadow-md bg-white">
                <AuthForm type="login" />
                <p className="text-sm text-center text-zinc-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
