import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value?: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardContent className="flex items-center justify-between  p-5">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-xl font-extrabold">{value}</p>
          </div>
          <div className="p-3 rounded-full bg-muted">{icon}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default StatCard;
