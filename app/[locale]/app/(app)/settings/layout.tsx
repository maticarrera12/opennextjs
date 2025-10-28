import SettingsSidebar from "./_components/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <SettingsSidebar />
      <main className="flex-1 overflow-y-auto border-t border-border bg-background pt-14 md:pt-0">
        <div className="mx-auto max-w-3xl p-6 md:p-10">{children}</div>
      </main>
    </div>
  );
}
