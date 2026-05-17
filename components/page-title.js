export default function PageTitle({ children, icon }) {
  return (
    <header className="flex items-center justify-center gap-2.5 text-center">
      {icon}
      <h1 className="m-0 whitespace-nowrap font-display text-[44px] font-normal leading-[90%]">
        {children}
      </h1>
    </header>
  );
}
