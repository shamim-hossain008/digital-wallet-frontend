import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useChangeAdminPasswordMutation,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
} from "@/redux/features/Admin-api/admin.api";
import { motion } from "framer-motion";
import AvatarUpload from "../../../components/common/AvatarUpload";
import ChangePasswordDialog from "../../../components/common/ChangePasswordDialog";
import EditProfileDialog from "../../../components/common/EditProfileDialog";
import ProfileCompletion from "../../../components/common/ProfileCompletion";

function AdminProfile() {
  const { data, isLoading } = useGetAdminProfileQuery();

  if (!data?.data) {
    return (
      <p className="text-center tex-sm text-muted-foreground">
        Profile data not available
      </p>
    );
  }
  const admin = data?.data;

  const statusColor =
    admin.isActive === "ACTIVE" ? "text-green-700" : " text-red-700";
  if (isLoading) return <GlobalSkeleton />;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="max-w-5xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Admin Profile</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* LEFT – AVATAR */}
            <div className="flex flex-col justify-center items-center gap-4">
              <AvatarUpload
                profile={admin}
                mutationHook={useUpdateAdminProfileMutation}
              />
              <ProfileCompletion profile={admin} />
            </div>

            {/* RIGHT – INFO */}
            <div className="md:col-span-2 space-y-4">
              <Info label="Name" value={admin.name} />
              <Info label="Email" value={admin.email} />
              <Info label="Phone" value={admin.phone ?? "N/A"} />
              <Info label="Role" value={admin.role} />

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className={statusColor}>
                  {admin.isActive ?? "INACTIVE"}
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <EditProfileDialog
                  profile={admin}
                  mutationHook={useUpdateAdminProfileMutation}
                />
                <ChangePasswordDialog
                  mutationHook={useChangeAdminPasswordMutation}
                />
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
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default AdminProfile;
