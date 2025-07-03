import { Link } from "wouter";
import { BookOpen, Award, MessageCircle, Smartphone } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl gradient-navy flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gradient">Smart<span className="text-amber-500">Pro</span></h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/landing" className="text-slate-700 hover:text-primary font-medium transition-colors">Beranda</Link>
              <Link href="/about" className="text-slate-700 hover:text-primary font-medium transition-colors">Tentang</Link>
              <Link href="/faq" className="text-slate-700 hover:text-primary font-medium transition-colors">FAQ</Link>
              <Link href="/privacy" className="text-slate-700 hover:text-primary font-medium transition-colors">Privasi</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 premium-gradient opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
              Smart<span className="text-amber-300">Pro</span>
            </h1>
            <p className="text-xl md:text-3xl mb-6 text-white/90 font-light max-w-4xl mx-auto">
              Platform Edukasi Modern untuk Masa Depan Cerdas
            </p>
            <p className="text-lg md:text-xl mb-12 text-white/80 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan siswa dan guru dalam perjalanan pembelajaran yang mengubah hidup
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/login">
              <div className="floating-card bg-white/95 hover:bg-white card-hover text-slate-800 py-6 px-8 rounded-2xl group">
                <div className="w-12 h-12 rounded-xl gradient-navy flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Masuk</h3>
                <p className="text-slate-600 text-sm">Lanjutkan pembelajaran Anda</p>
              </div>
            </Link>
            
            <Link href="/register-student">
              <div className="floating-card gradient-gold card-hover text-white py-6 px-8 rounded-2xl group">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Daftar Siswa</h3>
                <p className="text-white/90 text-sm">Mulai perjalanan belajar Anda</p>
              </div>
            </Link>
            
            <Link href="/register-teacher">
              <div className="floating-card bg-green-500 hover:bg-green-400 card-hover text-white py-6 px-8 rounded-2xl group">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Daftar Guru</h3>
                <p className="text-white/90 text-sm">Berbagi ilmu, menginspirasi generasi</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Mengapa Memilih SmartPro?</h2>
            <p className="text-slate-600 text-lg">Platform pembelajaran terdepan dengan teknologi modern</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-navy-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Pembelajaran Interaktif</h3>
              <p className="text-slate-600">Materi pembelajaran yang engaging dengan kuis interaktif</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-gold-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Sertifikat Digital</h3>
              <p className="text-slate-600">Dapatkan sertifikat resmi setelah menyelesaikan pembelajaran</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Chat Langsung</h3>
              <p className="text-slate-600">Berkomunikasi langsung dengan guru ahli kapan saja</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Smart<span className="text-gold-500">Pro</span></h3>
              <p className="text-slate-300 mb-4">Platform pembelajaran online terdepan di Indonesia</p>
              <p className="text-sm text-slate-400">by Arvin Erlangga</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <div className="space-y-2 text-slate-300">
                <p>📧 info@smartpro.id</p>
                <p>📞 +62 812-3456-7890</p>
                <p>📍 Jakarta, Indonesia</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sosial Media</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-300 hover:text-gold-500">📘</a>
                <a href="#" className="text-slate-300 hover:text-gold-500">📷</a>
                <a href="#" className="text-slate-300 hover:text-gold-500">📺</a>
                <a href="#" className="text-slate-300 hover:text-gold-500">💬</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Link Cepat</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-slate-300 hover:text-gold-500">Tentang Kami</Link>
                <Link href="/privacy" className="block text-slate-300 hover:text-gold-500">Kebijakan Privasi</Link>
                <Link href="/faq" className="block text-slate-300 hover:text-gold-500">FAQ</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 SmartPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
