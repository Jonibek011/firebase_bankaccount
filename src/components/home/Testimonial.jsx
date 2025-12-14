import { motion } from "framer-motion";

import { useInView } from "../../hooks/useInView";
import { LuQuote } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";

const testimonials = [
  {
    name: "Sardor Karimov",
    role: "Startap Asoschisi",
    image:
      "https://images.unsplash.com/photo-1597651711127-600d0c2e78b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBtYW4lMjBoYXBweXxlbnwxfHx8fDE3NjU0NDY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    text: "lifeHub bilan ishni tashkil qilish juda oson bo'ldi. Vazifalar va xarajatlarni bir joyda kuzatish ish samaradorligini sezilarli darajada oshirdi!",
  },
  {
    name: "Nilufar Rahimova",
    role: "Loyiha Menejeri",
    image:
      "https://images.unsplash.com/photo-1600275669439-14e40452d20b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NjU0MjEwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    text: "Jamoa bilan muloqot qilish hech qachon bunday qulay bo'lmagan. Chat funksiyasi va vazifalarni birgalikda boshqarish imkoniyati ajoyib!",
  },
  {
    name: "Timur Azimov",
    role: "Freelancer",
    image:
      "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjU0MTY4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    text: "Bir nechta mijozlar bilan ishlaganimda, lifeHub barcha loyihalarimni tartibga solishga yordam berdi. Xarajat nazorati esa moliyaviy rejalashtirish uchun juda foydali!",
  },
];

export function Testimonials() {
  const { ref, inView } = useInView();

  return (
    <section id="testimonials" className="relative py-16 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-300 mb-6 border border-purple-500/20">
            <FaStar className="w-4 h-4" />
            <span>Testimonials</span>
          </div>
          <h2 className="text-white text-5xl md:text-6xl mb-6">
            Our customers{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              about Us
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Over a thousand users are making their work more efficient with
            LifeHub
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </section>
  );
}

function TestimonialCard({ testimonial, index }) {
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0, scale: 0.9 }}
      animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      <div className="relative h-full p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:transform hover:scale-105">
        {/* Quote icon */}
        <div className="absolute top-6 right-6 opacity-20">
          <LuQuote className="w-12 h-12 text-purple-400" />
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <FaStar
              key={i}
              className="w-5 h-5 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>

        {/* Testimonial text */}
        <p className="text-gray-300 mb-8 relative z-10 leading-relaxed">
          {testimonial.text}
        </p>

        {/* User info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-50" />
            <div className="images w-14 h-14 rounded-full overflow-hidden  border-2 border-white/20">
              <img className="object-cover" src={testimonial.image} alt="" />
            </div>
          </div>
          <div>
            <h4 className="text-white">{testimonial.name}</h4>
            <p className="text-gray-400 text-sm">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
