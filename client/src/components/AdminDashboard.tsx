import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  BarChart3, 
  UserCheck, 
  Users, 
  BookOpen, 
  HelpCircle, 
  Crown, 
  History, 
  DollarSign, 
  UserCog,
  Presentation,
  GraduationCap,
  Menu,
  LogOut,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import { getPendingTeachers, updateUserStatus, getStats } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";

interface PendingTeacher {
  id: string;
  nama: string;
  email: string;
  bidang_keahlian: string;
}

interface Stats {
  totalGuru: number;
  totalSiswa: number;
  totalMateri: number;
  activeToday: number;
}

const AdminDashboard = () => {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingTeachers, setPendingTeachers] = useState<PendingTeacher[]>([]);
  const [stats, setStats] = useState<Stats>({ totalGuru: 0, totalSiswa: 0, totalMateri: 0, activeToday: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pendingData, statsData] = await Promise.all([
          getPendingTeachers(),
          getStats()
        ]);
        
        setPendingTeachers(pendingData as PendingTeacher[]);
        setStats(statsData);
      } catch (error) {
        console.error("Error loading admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  const handleApproveTeacher = async (teacherId: string) => {
    try {
      await updateUserStatus(teacherId, 'active');
      setPendingTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      toast({
        title: "Berhasil",
        description: "Guru berhasil diverifikasi",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memverifikasi guru",
        variant: "destructive",
      });
    }
  };

  const handleRejectTeacher = async (teacherId: string) => {
    try {
      await updateUserStatus(teacherId, 'rejected');
      setPendingTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      toast({
        title: "Berhasil",
        description: "Guru ditolak",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menolak guru",
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
    { id: 'dashboard', icon: BarChart3, title: 'Dashboard', active: true },
    { id: 'verify-teachers', icon: UserCheck, title: 'Verifikasi Guru' },
    { id: 'user-data', icon: Users, title: 'Data Pengguna' },
    { id: 'manage-materials', icon: BookOpen, title: 'Manajemen Materi' },
    { id: 'manage-quiz', icon: HelpCircle, title: 'Manajemen Kuis' },
    { id: 'subscriptions', icon: Crown, title: 'Konfirmasi Langganan' },
    { id: 'transactions', icon: History, title: 'Riwayat Transaksi' },
    { id: 'send-balance', icon: DollarSign, title: 'Kirim Saldo' },
    { id: 'manage-roles', icon: UserCog, title: 'Atur Role & Status' },
  ];

  const statCards = [
    { title: 'Total Guru', value: stats.totalGuru, icon: Presentation, color: 'bg-green-100 text-green-600' },
    { title: 'Total Siswa', value: stats.totalSiswa, icon: GraduationCap, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Materi', value: stats.totalMateri, icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
    { title: 'Pengguna Aktif Hari Ini', value: stats.activeToday, icon: Users, color: 'bg-yellow-100 text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white shadow-lg">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-navy-900">
              <h1 className="text-xl font-bold text-white">Smart<span className="text-gold-500">Pro</span></h1>
              <span className="ml-2 text-xs text-gold-400">Admin</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      item.active 
                        ? 'bg-navy-50 text-navy-700' 
                        : 'text-slate-600 hover:bg-slate-50'
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
          <header className="bg-white shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    className="lg:hidden mr-2"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <h2 className="text-xl font-semibold text-navy-900">Dashboard Admin</h2>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="text-slate-600 hover:text-slate-800"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 ${stat.color.split(' ')[0]} rounded-lg flex items-center justify-center`}>
                          <stat.icon className={`w-5 h-5 ${stat.color.split(' ')[1]}`} />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                        <p className="text-2xl font-semibold text-navy-900">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pending Teacher Verifications */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-navy-900">
                  Verifikasi Guru Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600">Memuat data...</p>
                  </div>
                ) : pendingTeachers.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600">Tidak ada guru yang menunggu verifikasi.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingTeachers.map((teacher, index) => (
                      <div key={teacher.id}>
                        <div className="flex items-center justify-between py-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                              <Presentation className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-navy-900">{teacher.nama}</h4>
                              <p className="text-sm text-slate-600">{teacher.email}</p>
                              <p className="text-xs text-slate-500">Bidang: {teacher.bidang_keahlian}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => handleApproveTeacher(teacher.id)}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Verifikasi
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectTeacher(teacher.id)}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Tolak
                            </Button>
                          </div>
                        </div>
                        {index < pendingTeachers.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-navy-900">
                  Aktivitas Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start py-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-navy-900">Sistem SmartPro telah diinisialisasi</p>
                      <p className="text-xs text-slate-500">Baru saja</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center p-2 text-navy-600">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </button>
          <button className="flex flex-col items-center p-2 text-slate-600">
            <UserCheck className="w-5 h-5" />
            <span className="text-xs mt-1">Verifikasi</span>
          </button>
          <button className="flex flex-col items-center p-2 text-slate-600">
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Users</span>
          </button>
          <button className="flex flex-col items-center p-2 text-slate-600">
            <UserCog className="w-5 h-5" />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminDashboard;
