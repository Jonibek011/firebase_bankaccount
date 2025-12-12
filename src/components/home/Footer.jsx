import { Sparkles, Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative w-full py-20 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-2xl">lifeHub</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Hayotingizni osonlashtiring. Chat, xarajatlar va vazifalarni
              boshqarish - hammasi bir joyda.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-300" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white mb-4">Mahsulot</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Imkoniyatlar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Narxlar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Yangiliklar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white mb-4">Kompaniya</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Biz haqimizda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ish o&apos;rinlari
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Aloqa
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">
            © 2025 lifeHub. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Maxfiylik siyosati
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Shartlar
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Cookie&apos;lar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
