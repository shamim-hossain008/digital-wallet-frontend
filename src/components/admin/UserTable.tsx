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
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Status</th>
            <th className="text-right p-3">Action</th>
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
                className="border-t"
              >
                <td className="p-3">{user.name}</td>
                <td>{user.email}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      isBlocked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() =>
                      toggleBlock({
                        userId: user._id!,
                        isBlocked: !isBlocked,
                      })
                    }
                    className={`px-3 py-1 rounded text-white text-xs ${
                      isBlocked ? "bg-green-600" : "bg-red-600"
                    }`}
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
        <div className="flex justify-between p-3">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span>
            Page {meta.page} /{" "}
            {Math.ceil((meta.total ?? 0) / (meta.limit ?? 10))}
          </span>
          <button
            disabled={page * (meta.limit ?? 10) >= (meta.total ?? 0)}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default UserTable;
