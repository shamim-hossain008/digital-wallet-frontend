interface Props {
  isPaid: boolean;
}

function CommissionStatusBadge({ isPaid }: Props) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs ${
        isPaid
          ? "bg-green-500/10 text-green-500"
          : "bg-yellow-500/10 text-yellow-500"
      }`}
    >
      {isPaid ? "PAID" : "UNPAID"}
    </span>
  );
}

export default CommissionStatusBadge;
