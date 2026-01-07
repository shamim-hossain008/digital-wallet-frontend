import UsersFilters from "@/components/admin/UsersFilters";
import UserTable from "@/components/admin/UserTable";
import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { useGetAllUsersQuery } from "@/redux/features/Admin-api/admin.api";
import { motion } from "framer-motion";
import { useState } from "react";

function AllUsers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"active" | "blocked" | undefined>();

  const { data, isLoading } = useGetAllUsersQuery({
    page,
    limit: 10,
    search,
    status,
  });

  if (isLoading) return <GlobalSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-semibold">All Users</h1>

      <UsersFilters onSearch={setSearch} onStatusChange={setStatus} />

      <UserTable
        users={data?.data ?? []}
        meta={data?.meta}
        page={page}
        setPage={setPage}
      />
    </motion.div>
  );
}

export default AllUsers;
