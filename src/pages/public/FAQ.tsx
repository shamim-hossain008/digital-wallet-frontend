import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqItems = [
  {
    question: "What is a Digital Wallet?",
    answer:
      "A digital wallet allows you to securely store, send, and receive money using your smartphone or online browser.",
  },
  {
    question: "How do I deposit money?",
    answer:
      "Users can deposit money through agents or linked bank accounts. An Agent helps convert cash to wallet balance.",
  },
  {
    question: "Is my money safe?",
    answer:
      "Absolutely. We use encrypted security standards and multi-layer authentication to protect your account.",
  },
  {
    question: "Can I send money to any user?",
    answer:
      "Yes, just enter the recipient’s phone number or email, confirm the details, and send instantly.",
  },
  {
    question: "What fees are charged for transactions?",
    answer:
      "Most wallet-to-wallet transfers are free. Cash-in & withdrawals may include a small service fee.",
  },
];

function FAQ() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen container mx-auto px-6 py-20"
    >
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-primary">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Answers to help you understand how the Digital Wallet works
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-10 max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="text-lg font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </motion.section>
  );
}

export default FAQ;
