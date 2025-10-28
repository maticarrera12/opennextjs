import { Separator } from "@/components/ui/separator";

export function ProfileHeader() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      <Separator />
    </>
  );
}
