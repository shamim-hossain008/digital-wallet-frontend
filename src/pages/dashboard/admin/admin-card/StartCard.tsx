import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

function StartCard({
  title,
  value,
}: {
  title: string;
  value?: number | string;
}) {
  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card>
        <CardContent className="space-y-2 p-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value ?? 0}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default StartCard;
