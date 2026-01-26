import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountStatusBadge from "@/pages/public/AccountStatusBadge";
import InfoRow from "@/pages/public/InfoRow";
import {
  useChangeAgentPasswordMutation,
  useGetAgentProfileQuery,
  useRemoveAgentPictureMutation,
  useUpdateAgentProfileMutation,
} from "@/redux/features/agent-api/agent.api";
import { motion } from "framer-motion";
import AvatarUpload from "../../../components/common/AvatarUpload";
import ChangePasswordDialog from "../../../components/common/ChangePasswordDialog";
import EditProfileDialog from "../../../components/common/EditProfileDialog";
import ProfileCompletion from "../../../components/common/ProfileCompletion";

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
              <AvatarUpload
                profile={profile}
                mutationHook={useUpdateAgentProfileMutation}
                removeHook={useRemoveAgentPictureMutation}
              />
              <ProfileCompletion profile={profile} />
            </div>

            {/* RIGHT – INFO */}
            <div className="md:col-span-2 space-y-4">
              <InfoRow label="Name" value={profile.name} />
              <InfoRow label="Email" value={profile.email} />
              <InfoRow label="Phone" value={profile.phone ?? "N/A"} />
              <InfoRow label="Role" value={profile.role} />

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>

                <AccountStatusBadge
                  status={profile.isActive as "ACTIVE" | "INACTIVE"}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <EditProfileDialog
                  profile={profile}
                  mutationHook={useUpdateAgentProfileMutation}
                />
                <ChangePasswordDialog
                  mutationHook={useChangeAgentPasswordMutation}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

export default AgentProfile;
