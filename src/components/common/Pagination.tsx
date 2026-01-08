import { Button } from "../ui/button";

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
      <Button variant="outline" disabled={page === 1} onClick={onPrev}>
        Prev
      </Button>
      <span>
        Page{page}/{totalPages}
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

export default Pagination;
