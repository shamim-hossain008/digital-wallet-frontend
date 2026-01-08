import type { IUserInfoData } from "@/types/auth.type";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import AgentStatusBadge from "./AgentStatusBadge";

interface Props {
  agent: IUserInfoData;
  onApprove: () => void;
  onSuspend: () => void;
}

function AgentRow({ agent, onApprove, onSuspend }: Props) {
    
  const isPending = !agent.isApproved;
  const isBlocked = agent.isActive === "BLOCKED";

  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b dark:border-muted"
    >
      <td className="p-3">{agent.name}</td>
      <td>{agent.email}</td>

      <td>
        <AgentStatusBadge
          isActive={agent.isActive}
          isApproved={agent.isApproved}
        />
      </td>

      <td className="text-right space-x-2">
        {isPending && (
          <Button size="sm" onClick={onApprove}>
            Approve
          </Button>
        )}

        {!isBlocked && (
          <Button size="sm" variant="destructive" onClick={onSuspend}>
            Suspend
          </Button>
        )}
      </td>
    </motion.tr>
  );
}

export default AgentRow;
