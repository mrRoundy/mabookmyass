import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-[#173F25] font-serif mb-4">
          Thank You!
        </h1>
        <p className="text-gray-600 mb-6">
          Your feedback has been received and is greatly appreciated.
        </p>
        <Link 
          href="/" 
          className="bg-[#173F25] hover:opacity-90 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}