// app/verify-email/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { Suspense, useState } from 'react';

function VerifyEmailContent() {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResendVerification = async () => {
        setMessage('');
        setError('');
        if (user) {
            try {
                await sendEmailVerification(user);
                setMessage('A new verification email has been sent. Please check your inbox.');
            } catch (err) {
                setError('Failed to resend verification email. Please try again in a few minutes.');
            }
        } else {
             // This can happen if the page is refreshed and the user state is not yet loaded
            setError('You must be logged in to resend the verification email. Please log in again.');
        }
    };
    
    // Redirect if user is already verified and lands here by mistake
    if (user?.emailVerified) {
        router.push('/');
        return null;
    }

    return (
        <main className="container mx-auto px-6 py-12 flex justify-center">
            <div className="w-full max-w-md text-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <svg className="w-16 h-16 mx-auto text-classic-green mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <h1 className="text-3xl font-bold text-[#173F25] font-serif mb-4">
                        Verify Your Email
                    </h1>
                    <p className="text-gray-600 mb-6">
                        We've sent a verification link to <strong className="text-gray-800">{email || 'your email address'}</strong>. Please check your inbox and click the link to activate your account.
                    </p>
                    {message && <p className="text-green-600 mb-4">{message}</p>}
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <button
                        onClick={handleResendVerification}
                        className="bg-classic-green hover:opacity-90 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline w-full mb-4"
                    >
                        Resend Verification Email
                    </button>
                    <button
                        onClick={() => router.push('/login')}
                        className="text-classic-green font-bold"
                    >
                       Go to Login
                    </button>
                </div>
            </div>
        </main>
    );
}


export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}