import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck, Users } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen pt-20 pb-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6"
        >
          About Our Digital Wallet Service
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-lg text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-16"
        >
          Empowering people to manage money with confidence — safe, fast and
          secure digital payments designed for everyone.
        </motion.p>

        {/* MISSION + VISION */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {[
            {
              icon: <ShieldCheck className="w-10 h-10" />,
              title: "Our Mission",
              text: "To provide secure and seamless financial services that help users stay in control of their money — anytime, anywhere.",
            },
            {
              icon: <HeartHandshake className="w-10 h-10" />,
              title: "Our Vision",
              text: "To build a world where digital transactions are trusted, accessible, and effortless for all communities.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 mb-4">
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* TEAM SECTION */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10"
        >
          Meet Our Team
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((team, idx) => (
            <motion.div
              key={team}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                U{team}
              </div>

              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
                Team Member {team}
              </h4>

              <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                Dedicated to shaping the future of digital finance.
              </p>

              <Users className="w-6 h-6 text-indigo-500 mt-3" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
