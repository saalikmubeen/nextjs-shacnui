import ThemeToggleBtn from '@/components/ui/themeToggleBtn';

export default function LoggedOutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col gap-4 items-center min-h-screen p-24 justify-center">
        {children}
      </div>
      {/* <ThemeToggleBtn className="fixed top-[calc(50%-12px)] right-10" /> */}
      <ThemeToggleBtn className="fixed top-1/2 -translate-y-1/2 right-10" />
    </>
  );
}
