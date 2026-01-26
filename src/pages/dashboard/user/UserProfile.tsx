import AvatarUpload from "@/components/common/AvatarUpload";
import ChangePasswordDialog from "@/components/common/ChangePasswordDialog";
import EditProfileDialog from "@/components/common/EditProfileDialog";
import ProfileCompletion from "@/components/common/ProfileCompletion";
import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountStatusBadge from "@/pages/public/AccountStatusBadge";
import InfoRow from "@/pages/public/InfoRow";
import {
  useRemoveUserPictureMutation,
  useUpdatedUserPasswordMutation,
  useUpdateUserAvatarMutation,
  useUpdateUserProfileMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";

function UserProfile() {
  const { data, isLoading } = useUserInfoQuery();

  if (isLoading) return <GlobalSkeleton />;

  const profile = data?.data;

  if (!profile) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Profile data not available
      </p>
    );
  }

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

          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT – AVATAR */}
            <div className="flex flex-col items-center gap-4">
              <AvatarUpload
                profile={profile}
                mutationHook={useUpdateUserAvatarMutation}
                removeHook={useRemoveUserPictureMutation}
              />
              <ProfileCompletion profile={profile} />
            </div>

            {/* RIGHT – INFO */}
            <div className="md:col-span-2 space-y-4">
              <InfoRow label="Name" value={profile.name} />
              <InfoRow label="Email" value={profile.email} />
              <InfoRow label="Phone" value={profile.phone ?? "N/A"} />
              <InfoRow label="Role" value={profile.role} />
              <InfoRow
                label="Status"
                value={
                  <AccountStatusBadge
                    status={profile.isActive as "ACTIVE" | "INACTIVE"}
                  />
                }
              />

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <EditProfileDialog
                  profile={profile}
                  mutationHook={useUpdateUserProfileMutation}
                />
                <ChangePasswordDialog
                  mutationHook={useUpdatedUserPasswordMutation}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

export default UserProfile;
