import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  limit: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

function Pagination({ page, limit, total, onPrev, onNext }: Props) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-between pt-4">
      <Button disabled={page === 1} onClick={onPrev}>
        Previous
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>

      <Button disabled={page * limit >= total} onClick={onNext}>
        Next
      </Button>
    </div>
  );
}

export default Pagination;
