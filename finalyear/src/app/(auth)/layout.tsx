export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-white flex flex-col justify-center">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
      <footer className="text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} SPRODETA. All rights reserved.
      </footer>
    </div>
  );
} 