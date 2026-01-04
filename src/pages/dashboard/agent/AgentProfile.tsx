import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAgentProfileQuery } from "@/redux/features/agent  api/agent.api";
import { motion } from "framer-motion";
import ChangePasswordDialog from "./agent-dialog/ChangePasswordDialog";
import EditProfileDialog from "./agent-dialog/EditProfileDialog";
import AvatarUpload from "./agent-profile/AvatarUpload";
import ProfileCompletion from "./agent-profile/ProfileCompletion";

function AgentProfile() {
  const { data, isLoading } = useGetAgentProfileQuery(undefined);

  if (!data?.data) {
    return (
      <p className="text-center tex-sm text-muted-foreground">
        Profile data not available
      </p>
    );
  }

  if (isLoading) return <GlobalSkeleton />;

  const profile = data?.data;

  const statusColor =
    profile.isActive === "ACTIVE" ? "text-green-700" : " text-red-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="max-w-5xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-3  gap-4">
            {/* LEFT – AVATAR */}
            <div className="flex flex-col justify-center  items-center gap-4">
              <AvatarUpload profile={profile} />
              <ProfileCompletion profile={profile} />
            </div>

            {/* RIGHT – INFO */}
            <div className="md:col-span-2 space-y-4">
              <Info label="Name" value={profile.name} />
              <Info label="Email" value={profile.email} />
              <Info label="Phone" value={profile.phone ?? "N/A"} />
              <Info label="Role" value={profile.role} />

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>

                <span className={statusColor}>
                  {profile.isActive ?? "INACTIVE"}
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <EditProfileDialog profile={profile} />
                <ChangePasswordDialog />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 text-sm">
      <span className="text-muted-foreground  ">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default AgentProfile;
