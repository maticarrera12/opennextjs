import SettingsSidebar from "./_components/settings-sidebar";


export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <SettingsSidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
