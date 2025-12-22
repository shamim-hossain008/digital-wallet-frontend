import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { SectionLoader } from "@/components/loading/SectionLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import AccountStatusBadge from "@/pages/public/AccountStatusBadge";
import InfoRow from "@/pages/public/InfoRow";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { data, isLoading, isFetching } = useUserInfoQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <GlobalSkeleton />;
  }

  const user = data?.data;

  return (
    <div className="p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="max-w-md mx-auto"
      >
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Profile</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.photo} />
                <AvatarFallback className="bg-muted">
                  <User className="h-10 w-10 opacity-60" />
                </AvatarFallback>
              </Avatar>

              <div className="text-center">
                <h2 className="text-lg font-semibold">
                  {user?.name || "Unnamed User"}
                </h2>
                <p className="text-sm text-muted-foreground break-all">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Info */}
            {isFetching ? (
              <SectionLoader />
            ) : (
              <div className="space-y-3 text-sm">
                <InfoRow label="Role" value={user?.role} />
                <InfoRow label="Phone" value={user?.phone || "—"} />
                <InfoRow
                  label="Account Status"
                  value={<AccountStatusBadge status={user?.isActive} />}
                />
              </div>
            )}

            {/* Action */}
            <Button
              disabled={isLoading}
              className="w-full"
              onClick={() => navigate("/user/profile/edit")}
            >
              {isLoading ? <Spinner /> : "Edit Profile"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default UserProfile;
