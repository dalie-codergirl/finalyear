'use client';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center px-4 py-2 rounded-lg text-white bg-sky-400 hover:bg-sky-500 transition-colors duration-200 mb-4 shadow-sm hover:shadow-md"
    >
      <ArrowLeftIcon className="w-5 h-5 mr-2" />
      <span className="font-medium">Back</span>
    </button>
  );
} 