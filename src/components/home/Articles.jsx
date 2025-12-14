import { motion } from "framer-motion";
import { LuCalendar, LuClock, LuArrowRight, LuBookOpen } from "react-icons/lu";
import { useInView } from "../../hooks/useInView";

const articles = [
  {
    title: "7 ways to improve work efficiancy",
    excerpt:
      "Learn how to perform your daily tasks more efficiently with modern tools.",
    image:
      "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjB3b3Jrc3BhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzY1NDY1MjUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "8 December, 2025",
    readTime: "5 minutes",
    category: "Efficancy",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    title: "Importent rules for teamwork",
    excerpt: "Basic principles and practical tips for successful team work.",
    image:
      "https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjU0MjQ3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "5 December, 2025",
    readTime: "7 minutes",
    category: "Teamwork",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    title: "Digital Transformation: Modernizing Business",
    excerpt:
      "Learn how modern technologies can take your business to the next level.",
    image:
      "https://images.unsplash.com/photo-1593642633279-1796119d5482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NTM2NDAxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2 December, 2025",
    readTime: "6 minutes",
    category: "Technology",
    gradient: "from-blue-500 to-cyan-500",
  },
];

export function Articles() {
  const { ref, inView } = useInView();

  return (
    <section id="articles" className="relative py-16 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-300 mb-6 border border-purple-500/20">
            <LuBookOpen className="w-4 h-4" />
            <span>Blog</span>
          </div>
          <h2 className="text-white text-5xl md:text-6xl mb-6">
            Last{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              articles
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Useful information about work efficiency, teamwork, and modern
            technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} index={index} />
          ))}
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    </section>
  );
}

function ArticleCard({ article, index }) {
  const { ref, inView } = useInView();

  return (
    <motion.article
      ref={ref}
      initial={{ y: 50, opacity: 0, scale: 0.95 }}
      animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
        }}
      />

      <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 overflow-hidden">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />

          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-20">
            <div
              className={`px-3 py-1 bg-gradient-to-r ${article.gradient} rounded-full text-white text-sm backdrop-blur-sm`}
            >
              {article.category}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Meta info */}
          <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
            <div className="flex items-center gap-1">
              <LuCalendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <LuClock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-white text-2xl mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 mb-6 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Read more link */}
          <button className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
            <span>View more</span>
            <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
