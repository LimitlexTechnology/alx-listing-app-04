import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">ALX Listing App 03</h1>
      <p className="mb-4">Welcome to the Booking Detail Page implementation.</p>
      <Link href="/booking" className="text-blue-500 hover:underline">
        Go to Booking Page →
      </Link>
    </div>
  );
}

