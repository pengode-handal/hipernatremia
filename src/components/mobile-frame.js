export default function MobileFrame({ children, className = "" }) {
  return (
    <main className="min-h-screen bg-white text-[#1e3e8a]">
      <div
        className={`mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-[30px] py-[50px] ${className}`}
      >
        {children}
      </div>
    </main>
  );
}
