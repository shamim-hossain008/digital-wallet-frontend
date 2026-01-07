import { Button } from "../ui/button";

interface Props {
  page: number;
  total: number;
  limit: number;
  onPrev: () => void;
  onNext: () => void;
}
function TransactionPagination({ page, total, limit, onPrev, onNext }: Props) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-between items-center pt-4">
      <Button variant="outline" disabled={page == 1} onClick={onPrev}>
        Previous
      </Button>
      <span>
        Page {page} / {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page * limit >= total}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
}

export default TransactionPagination;
