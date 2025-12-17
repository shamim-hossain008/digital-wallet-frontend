import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WalletTabs from "./WalletTabs";

function MyWallet() {
  return (
    <div className="p-6 space-y-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">My Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <WalletTabs />
        </CardContent>
      </Card>
    </div>
  );
}

export default MyWallet;
