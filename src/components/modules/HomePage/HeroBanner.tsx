import wallet from "@/assets/Image/card-wallet.png";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hook";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!user?.role) {
      navigate(`/login?redirectTo=/user/dashboard`);
    } else {
      navigate("/user/dashboard");
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 text-white py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Your Trusted <span className="text-yellow-300">Digital Wallet</span>
            <br />
            for Fast & Secure Payments
          </h1>

          <p className="text-lg md:text-xl opacity-90 max-w-lg">
            Manage your money effortlessly — send payments, track transactions &
            control your finances in one secured dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-3">
            <Button
              size="lg"
              className="bg-white text-indigo-700 hover:bg-gray-200 font-semibold rounded-xl"
              onClick={handleGetStarted}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-white border-white rounded-xl hover:bg-white/20"
              onClick={() => navigate("/features")}
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex justify-center"
        >
          <img
            src={wallet}
            alt="Digital Wallet"
            className="drop-shadow-2xl rounded-3xl select-none w-[320px] md:w-[400px] lg:w-[450px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
