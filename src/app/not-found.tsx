import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#F7F3EA]">
      <div className="text-center px-4">
        <p className="text-[#B18C56] text-8xl font-bold mb-4" style={{ fontFamily: "'Marcellus', serif" }}>404</p>
        <h1 className="text-2xl sm:text-3xl text-[#1E1C59] mb-4" style={{ fontFamily: "'Marcellus', serif" }}>
          Page Not Found
        </h1>
        <p className="text-[#11102F]/60 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to something delicious.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary !rounded-full">
            Go Home
          </Link>
          <Link href="/menu" className="btn-outline !rounded-full">
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
