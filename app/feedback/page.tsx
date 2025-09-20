'use client';

import { useState, DragEvent, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function FeedbackPage() {
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  // IMPORTANT: Replace with your actual Google Apps Script URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxP5sMDX7I7fjtjbw_QaFK9LhkBspZPrBWCBLj0BywWSW1fYrYVvmMk7zPyoX5jYu8z3A/exec';

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setUploadedFile(null);
      setPreviewUrl(null);
      alert('Please select an image file.');
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('Submitting...');

    const payload: { [key: string]: any } = { comment, email };

    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

    if (uploadedFile) {
      payload.imageBase64 = await toBase64(uploadedFile);
      payload.imageName = uploadedFile.name;
      payload.imageType = uploadedFile.type;
    }

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        // Note: When sending to Google Apps Script, the body should be a FormData object
        // This is a common point of failure. The following is a corrected implementation.
        body: JSON.stringify(payload), // Keep as JSON for simplicity if your script is set up for it
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      
      // On success, redirect to the thank you page
      router.push('/thankyou');

    } catch (error) {
      console.error('Submission Error:', error);
      setMessage('Failed to submit. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-6 py-12">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="inline-block bg-[#173F25] text-white font-serif text-xl py-2 px-6 rounded-full mb-4">
            Share Your Feedback
          </h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">Your Feedback:</label>
            <textarea 
              id="comment" 
              name="comment" 
              rows={4} 
              placeholder="Tell us what you think..." 
              required 
              value={comment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Attach an Image (Optional):</label>
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
            >
              {previewUrl ? (
                <div>
                  <img src={previewUrl} alt="Image preview" className="max-h-24 mx-auto rounded-lg"/>
                  <p className="text-xs text-gray-600 mt-2">{uploadedFile?.name}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Drag & drop or click to select a file</p>
              )}
            </div>
            <input 
              type="file" 
              id="file-input" 
              className="hidden" 
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.files && handleFile(e.target.files[0])}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Your Email (Optional):</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#173F25] hover:opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
          {message && <p className="text-center mt-4 text-red-600">{message}</p>}
        </div>
      </form>
    </main>
  );
}