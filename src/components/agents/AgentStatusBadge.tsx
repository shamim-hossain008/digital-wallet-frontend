interface Props {
  isActive?: "ACTIVE" | "INACTIVE" | "BLOCKED";
  isApproved?: boolean;
}

function AgentStatusBadge({ isActive, isApproved }: Props) {
  let label = "PENDING";
  let style = "text-yellow-500";

  if (isActive === "BLOCKED") {
    label = "BLOCKED";
    style = "bg-red-500/10 text-red-500";
  } else if (isApproved && isActive === "ACTIVE") {
    label = "ACTIVE";
    style = " text-green-500";
  }

  return <div className={`px-2 py-1 text-xs rounded ${style}`}>{label}</div>;
}

export default AgentStatusBadge;
