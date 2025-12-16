interface Props {
  children: React.ReactNode;
}

export function PageContainer({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <main className="max-w-7xl mx-auto px-6 py-6">
        {children}
      </main>
    </div>
  );
}
