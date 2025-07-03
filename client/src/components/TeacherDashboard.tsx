import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { User, BookOpen, Plus, MessageCircle, Bell, Edit, Trash2, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import { getMateriByGuru, Materi } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";

const TeacherDashboard = () => {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [materials, setMaterials] = useState<Materi[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadMaterials = async () => {
      if (user?.uid) {
        try {
          const userMaterials = await getMateriByGuru(user.uid);
          setMaterials(userMaterials);
        } catch (error) {
          console.error("Error loading materials:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadMaterials();
  }, [user]);

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
    toast({
      title: "Fitur sedang dikembangkan",
      description: `Fitur ${menuItem} akan segera tersedia!`,
    });
  };

  const sidebarItems = [
    { id: 'profile', icon: User, title: 'Profil Guru', active: true },
    { id: 'materials', icon: BookOpen, title: 'Materi Saya' },
    { id: 'add-material', icon: Plus, title: 'Tambah Materi' },
    { id: 'add-quiz', icon: Plus, title: 'Tambah Kuis' },
    { id: 'chat', icon: MessageCircle, title: 'Chat Siswa' },
    { id: 'notifications', icon: Bell, title: 'Notifikasi' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 glass-effect border-r border-white/20">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center h-20 flex-shrink-0 px-6 premium-gradient">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mr-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Smart<span className="text-amber-300">Pro</span></h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-4 py-6 space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      item.active 
                        ? 'bg-white/20 text-white backdrop-blur-sm' 
                        : 'text-slate-700 hover:bg-white/10 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="mr-3 w-5 h-5" />
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Top bar */}
          <header className="glass-effect border-b border-white/20 sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    className="lg:hidden mr-2"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-gradient">
                      Selamat datang, {user?.nama || 'Guru'}!
                    </h2>
                    <p className="text-slate-600 mt-1">Kelola pembelajaran dan berinteraksi dengan siswa</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="text-slate-600 hover:text-slate-800 hover:bg-white/50"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="floating-card bg-white/90 hover:bg-white card-hover p-8 group">
                <div className="flex items-center">
                  <div className="w-16 h-16 gradient-navy rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 professional-shadow">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">Total Materi</p>
                    <p className="text-4xl font-bold text-gradient mt-2">{materials.length}</p>
                  </div>
                </div>
              </div>

              <div className="floating-card bg-white/90 hover:bg-white card-hover p-8 group">
                <div className="flex items-center">
                  <div className="w-16 h-16 gradient-gold rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 professional-shadow">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">Siswa Aktif</p>
                    <p className="text-4xl font-bold text-gradient mt-2">12</p>
                  </div>
                </div>
              </div>

              <div className="floating-card bg-white/90 hover:bg-white card-hover p-8 group">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 professional-shadow">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">Total Kuis</p>
                    <p className="text-4xl font-bold text-gradient mt-2">8</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Materials */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-navy-900">
                  Materi Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600">Memuat materi...</p>
                  </div>
                ) : materials.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600">Belum ada materi yang dibuat.</p>
                    <Button 
                      className="mt-4 bg-navy-600 hover:bg-navy-700"
                      onClick={() => handleMenuClick('add-material')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Materi Pertama
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {materials.slice(0, 5).map((material, index) => (
                      <div key={material.id || index}>
                        <div className="flex items-center justify-between py-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-navy-900">{material.judul}</h4>
                              <p className="text-sm text-slate-600">{material.deskripsi}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {index < materials.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center p-2 text-navy-600">
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Beranda</span>
          </button>
          <button className="flex flex-col items-center p-2 text-slate-600">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs mt-1">Materi</span>
          </button>
          <button className="flex flex-col items-center p-2 text-slate-600">
            <Plus className="w-5 h-5" />
            <span className="text-xs mt-1">Tambah</span>
          </button>
          <button className="flex flex-col items-center p-2 text-slate-600">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs mt-1">Chat</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default TeacherDashboard;
