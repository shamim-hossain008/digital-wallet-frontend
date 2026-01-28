import { useForm } from "react-hook-form";

import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  message: string;
};

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("Submitted Data:", data);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      toast.success("Your inquiry has been submitted successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Submission failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 
      bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg p-8 rounded-2xl shadow-lg
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100"
      >
        <h2
          className="text-3xl font-bold text-center 
          text-blue-600 dark:text-blue-400 mb-6"
        >
          Contact Us
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border px-4 py-2 rounded-lg
              bg-gray-50 dark:bg-gray-700
              border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-200
              focus:outline-none focus:ring-2
              focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border px-4 py-2 rounded-lg
              bg-gray-50 dark:bg-gray-700
              border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-200
              focus:outline-none focus:ring-2
              focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              {...register("message", { required: "Message is required" })}
              rows={4}
              className="w-full border px-4 py-2 rounded-lg
              bg-gray-50 dark:bg-gray-700
              border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-200
              focus:outline-none focus:ring-2
              focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Write your message..."
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition flex items-center justify-center"
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Send Inquiry"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Contact;
