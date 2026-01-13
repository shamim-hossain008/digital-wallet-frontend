import { Button } from "../ui/button";

interface Props{
    onExport:()=>void 

}

function CommissionHistoryFilters({onExport}:Props) {
  return <div className="flex justify-end">
    <Button onClick={onExport}>Export CSV</Button>
  </div>;
}

export default CommissionHistoryFilters;
