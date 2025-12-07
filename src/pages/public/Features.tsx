
import {
  ShieldCheck,
  Wallet,
  Send,
  Users,
  LineChart,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import FeatureCard from "@/components/FeatureCard";




function Features() { 


   const features = [
     {
       icon: <Wallet className="w-8 h-8" />,
       title: "Secure Wallet",
       description: "Store and manage your money with bank-level protection.",
     },
     {
       icon: <Send className="w-8 h-8" />,
       title: "Instant Transfers",
       description: "Send and receive money in seconds at lightning speed.",
     },
     {
       icon: <Users className="w-8 h-8" />,
       title: "Agent Assistance",
       description: "Cash-in and cash-out with registered agents nationwide.",
     },
     {
       icon: <LineChart className="w-8 h-8" />,
       title: "Transaction Insights",
       description: "Track spending and financial growth with smart analytics.",
     },
     {
       icon: <ShieldCheck className="w-8 h-8" />,
       title: "Fraud Protection",
       description: "Advanced monitoring to keep your funds secure 24/7.",
     },
     {
       icon: <RotateCcw className="w-8 h-8" />,
       title: "Easy Refunds",
       description: "Mistakes happen — request refunds in just a few taps.",
     },
   ];
  return (
    <div className="min-h-screen pt-20 pb-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Why Choose Our Service?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          Experience fast, secure and modern digital money management — built
          for everyday life.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
