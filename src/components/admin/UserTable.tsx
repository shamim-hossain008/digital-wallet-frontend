import { useToggleUserBlockMutation } from "@/redux/features/Admin-api/admin.api";
import type { IUserInfoData, PaginationMeta } from "@/types";
import { motion } from "framer-motion";

interface Props {
  users: IUserInfoData[];
  meta?: PaginationMeta;
  page: number;
  setPage: (page: number) => void;
}
function UserTable({ users, meta, page, setPage }: Props) {
  const [toggleBlock] = useToggleUserBlockMutation();

  return (
    <div className="rounded-xl border bg-card text-card-foreground overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Status</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const isBlocked = user.isActive === "BLOCKED";

            return (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="border-t hover:bg-muted/50"
              >
                <td className="p-4 font-medium">{user.name}</td>

                <td className="text-muted-foreground">{user.email}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isBlocked
                        ? "bg-destructive/15 text-destructive"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    {isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="p-4 text-right">
                  <button
                    onClick={() =>
                      toggleBlock({
                        userId: user._id!,
                        isBlocked: !isBlocked,
                      })
                    }
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold transition
                      ${
                        isBlocked
                          ? "bg-primary text-primary-foreground hover:opacity-90"
                          : "bg-destructive text-white hover:opacity-90"
                      }
                      focus:outline-none focus:ring-2 focus:ring-ring`}
                  >
                    {isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      {meta && (
        <div className="flex items-center justify-between p-4 border-t text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded-md border bg-background hover:bg-muted disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-muted-foreground">
            Page <strong className="text-foreground">{meta.page}</strong> of{" "}
            <strong className="text-foreground">{meta.totalPages}</strong>
          </span>

          <button
            disabled={page >= meta.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded-md border bg-background hover:bg-muted disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default UserTable;
