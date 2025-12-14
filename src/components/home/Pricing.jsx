import { motion } from "framer-motion";
import { LuCheck, LuStar } from "react-icons/lu";
import { useInView } from "../../hooks/useInView";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "For personal use",
    features: [
      "5 tasks",
      "Main chat",
      "Expense tracking",
      "1 GB save",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "49,000",
    description: "For professional users",
    features: [
      "Unlimited tasks",
      "Premium chat opportunities",
      "Advanced analysis",
      "50 GB save",
      "Priority support",
      "Teamwork",
      "Export function",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: "99,000",
    description: "For large groups",
    features: [
      "All Pro opportunities",
      "Endless saving",
      "API entry",
      "Special integrations",
      "24/7 support",
      "Personal meneger",
      "On-premise variant",
      "SSO autentification",
    ],
    popular: false,
  },
];

export function Pricing() {
  const { ref, inView } = useInView();

  return (
    <section id="pricing" className="relative py-16 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-300 mb-6 border border-purple-500/20">
            <LuStar className="w-4 h-4" />
            <span>Prices</span>
          </div>
          <h2 className="text-white text-5xl md:text-6xl mb-6">
            Choose the plan that{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              suits you
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Customized pricing for any need. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, index }) {
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0, scale: 0.9 }}
      animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative ${plan.popular ? "md:-mt-8" : ""}`}
    >
      {plan.popular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full text-white flex items-center gap-2">
            <LuStar className="w-4 h-4" />
            <span>Popular</span>
          </div>
        </div>
      )}

      <div
        className={`relative h-full p-8 rounded-3xl border transition-all duration-500 hover:transform hover:scale-105 ${
          plan.popular
            ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl border-purple-500/50 shadow-2xl shadow-purple-500/20"
            : "bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20"
        }`}
      >
        <div className="mb-8">
          <h3 className="text-white text-2xl mb-2">{plan.name}</h3>
          <p className="text-gray-400 mb-6">{plan.description}</p>
          <div className="flex items-end gap-2">
            <span className="text-white text-5xl">{plan.price}</span>
            {plan.price !== "0" && (
              <span className="text-gray-400 mb-2">so&apos;m/month</span>
            )}
          </div>
        </div>

        <button
          className={`w-full py-4 rounded-xl mb-8 transition-all duration-300 ${
            plan.popular
              ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-500/50"
              : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
          }`}
        >
          Boshlash
        </button>

        <div className="space-y-4">
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <LuCheck className="w-3 h-3 text-green-400" />
              </div>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
