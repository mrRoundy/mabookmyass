// components/VerificationBanner.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';

export default function VerificationBanner() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false); // Add loading state

  const handleResendVerification = async () => {
    setMessage('');
    setError('');
    setIsResending(true); // Disable the button

    if (user) {
        try {
            await sendEmailVerification(user);
            setMessage('A new verification email has been sent.');
        } catch (err: any) {
            console.error("Verification Resend Error:", err); // Log the specific error
            // Check for the specific rate-limit error code from Firebase
            if (err.code === 'auth/too-many-requests') {
                setError('You have requested this too many times. Please wait a few minutes before trying again.');
            } else {
                setError('Failed to resend. Please try again later.');
            }
        } finally {
            setIsResending(false); // Re-enable the button
        }
    }
  };

  // Only show the banner if the user is logged in but their email is not verified
  if (!user || user.emailVerified) {
    return null;
  }

  return (
    <div className="w-full bg-yellow-100 border-b border-yellow-300 p-3 text-center text-sm text-yellow-800">
      <p>
        Your email is not verified. Please check your inbox or{' '}
        <button 
          onClick={handleResendVerification} 
          disabled={isResending} // Disable button when resending
          className="font-bold underline hover:text-yellow-900 disabled:text-yellow-500 disabled:cursor-not-allowed"
        >
          {isResending ? 'Sending...' : 'resend the verification email'}
        </button>
        .
      </p>
      {message && <p className="text-green-600 mt-1">{message}</p>}
      {error && <p className="text-red-600 mt-1">{error}</p>}
    </div>
  );
}