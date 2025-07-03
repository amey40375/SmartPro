import { useState } from "react";
import { useLocation } from "wouter";
import { BookOpen, Brain, Award, MessageCircle, History, Flame, Settings, Info, Wallet, Crown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import SubscriptionModal from "./SubscriptionModal";

const StudentDashboard = () => {
  const [, setLocation] = useLocation();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      setLocation('/landing');
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal logout",
        variant: "destructive",
      });
    }
  };

  const handleMenuClick = (menuItem: string) => {
    // Check subscription for premium features
    if (!user?.saldo && !['settings', 'about'].includes(menuItem)) {
      setShowSubscriptionModal(true);
      return;
    }
    
    toast({
      title: "Fitur sedang dikembangkan",
      description: `Fitur ${menuItem} akan segera tersedia!`,
    });
  };

  const menuItems = [
    { id: 'materials', icon: BookOpen, title: 'Materi Belajar', description: 'Akses semua materi pembelajaran', color: 'bg-blue-100 text-blue-600' },
    { id: 'quiz', icon: Brain, title: 'Kuis Interaktif', description: 'Uji pemahaman dengan kuis', color: 'bg-purple-100 text-purple-600' },
    { id: 'certificates', icon: Award, title: 'Sertifikat', description: 'Lihat sertifikat yang diperoleh', color: 'bg-green-100 text-green-600' },
    { id: 'chat', icon: MessageCircle, title: 'Live Chat', description: 'Chat dengan guru langsung', color: 'bg-yellow-100 text-yellow-600' },
    { id: 'history', icon: History, title: 'Riwayat Belajar', description: 'Lihat progress pembelajaran', color: 'bg-indigo-100 text-indigo-600' },
    { id: 'popular', icon: Flame, title: 'Topik Populer', description: 'Materi paling diminati', color: 'bg-red-100 text-red-600' },
    { id: 'settings', icon: Settings, title: 'Pengaturan', description: 'Kelola profil dan preferensi', color: 'bg-gray-100 text-gray-600' },
    { id: 'about', icon: Info, title: 'Tentang Kami', description: 'Informasi tentang SmartPro', color: 'bg-teal-100 text-teal-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl gradient-navy flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">Smart<span className="text-amber-500">Pro</span></h1>
                <span className="hidden sm:block text-slate-600 text-sm font-medium">Dashboard Siswa</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 gradient-gold px-4 py-2 rounded-xl text-white professional-shadow">
                <Wallet className="w-5 h-5" />
                <span className="font-bold">Rp {user?.saldo?.toLocaleString() || '0'}</span>
              </div>
              <Button 
                onClick={() => setShowSubscriptionModal(true)}
                className="premium-gradient text-white hover:scale-105 transition-transform professional-shadow"
              >
                <Crown className="w-4 h-4 mr-2" />
                Premium
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="text-slate-600 hover:text-slate-800 hover:bg-white/50"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gradient mb-4">
            Selamat datang, {user?.nama || 'Siswa'}!
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Mari mulai perjalanan pembelajaran yang menakjubkan dan raih prestasi terbaikmu</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="floating-card bg-white/80 hover:bg-white card-hover p-8 cursor-pointer group relative overflow-hidden"
              onClick={() => item.id === 'about' ? setLocation('/about') : handleMenuClick(item.id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 gradient-navy rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 professional-shadow">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
      </main>

      <SubscriptionModal 
        open={showSubscriptionModal}
        onOpenChange={setShowSubscriptionModal}
      />
    </div>
  );
};

export default StudentDashboard;
