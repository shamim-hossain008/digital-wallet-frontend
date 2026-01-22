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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
      }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer"
    >
      <Card className="border border-blue-500 bg-card text-card-foreground ">
        <CardContent className="flex items-center justify-between p-5">
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
