import { Button } from "@/components/ui/button";
import { useToggleUserBlockMutation } from "@/redux/features/Admin-api/admin.api";
import type { IUserInfoData, PaginationMeta } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import UserRoleModal from "./UserRoleModal";

interface Props {
  users: IUserInfoData[];
  meta?: PaginationMeta;
  page: number;
  setPage: (page: number) => void;
}

function UserTable({ users, meta, page, setPage }: Props) {
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    role: "USER" | "AGENT";
  } | null>(null);

  const [toggleBlock] = useToggleUserBlockMutation();

  return (
    <div className="rounded-xl border bg-card text-card-foreground overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Status</th>
            <th className="p-4 text-right">Role</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const isInactive = user.isActive === "INACTIVE";
            const isBlocked = user.isActive === "BLOCKED";
            const isAdmin = user.role === "ADMIN";

            return (
              <motion.tr key={user._id} className="border-t hover:bg-muted/50">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="text-muted-foreground">{user.email}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isInactive || isBlocked
                        ? "bg-destructive/15 text-destructive"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    {isBlocked ? "Blocked" : isInactive ? "Inactive" : "Active"}
                  </span>
                </td>
                <td
                  className={`p-4 text-right ${
                    !isAdmin ? "cursor-pointer underline" : "opacity-50"
                  }`}
                  onClick={() => {
                    if (!isAdmin) {
                      setSelectedUser({
                        id: user._id!,
                        role: user.role as "USER" | "AGENT",
                      });
                    }
                  }}
                >
                  
                  {user.role}
                </td>

                <td className="p-4 text-right">
                  <Button
                    size="sm"
                    disabled={isAdmin}
                    onClick={() => {
                      if (!isAdmin) {
                        toggleBlock({
                          userId: user._id!,
                          isActive:
                            user.isActive === "ACTIVE" ? "INACTIVE" : "ACTIVE",
                        });
                      }
                    }}
                    variant={
                      isInactive || isBlocked ? "default" : "destructive"
                    }
                    className={`font-semibold ${
                      isAdmin ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isAdmin
                      ? "Not Allowed"
                      : isInactive || isBlocked
                      ? "Unblock"
                      : "Block"}
                  </Button>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
      {/* user change role modal */}
      {selectedUser && (
        <UserRoleModal
          userId={selectedUser.id}
          currentRole={selectedUser.role}
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {/* Pagination */}
      {meta && (
        <div className="flex items-center justify-between p-4 border-t text-sm">
          <Button
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            variant="outline"
          >
            Previous
          </Button>

          <span className="text-muted-foreground">
            Page <strong className="text-foreground">{meta.page}</strong> of
            <strong className="text-foreground">{meta.totalPages}</strong>
          </span>

          <Button
            size="sm"
            disabled={page >= meta.totalPages}
            onClick={() => setPage(page + 1)}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserTable;
