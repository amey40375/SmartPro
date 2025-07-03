import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { signIn } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const user = await signIn(data.email, data.password);
      
      toast({
        title: "Login berhasil!",
        description: `Selamat datang, ${user.nama}`,
      });

      // Redirect based on role
      switch (user.role) {
        case 'admin':
          setLocation('/admin-dashboard');
          break;
        case 'guru':
          setLocation('/teacher-dashboard');
          break;
        case 'siswa':
          setLocation('/student-dashboard');
          break;
        default:
          setLocation('/landing');
      }
    } catch (error: any) {
      toast({
        title: "Login gagal",
        description: error.message || "Terjadi kesalahan saat login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Button 
          variant="ghost" 
          onClick={() => setLocation('/landing')}
          className="hover:bg-white/50"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali
        </Button>
      </div>
      
      <div className="w-full max-w-md">
        <div className="floating-card bg-white/90 backdrop-blur-lg p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-navy flex items-center justify-center mx-auto mb-4 professional-shadow">
              <ArrowLeft className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gradient mb-3">
              Smart<span className="text-amber-500">Pro</span>
            </h1>
            <p className="text-xl text-slate-700 font-medium">Masuk ke akun Anda</p>
            <p className="text-sm text-slate-500 mt-2">Platform edukasi terdepan untuk masa depan cerdas</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan email Anda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Masukkan password Anda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-navy-600" />
                  <span className="ml-2 text-sm text-slate-600">Ingat saya</span>
                </label>
                <a href="#" className="text-sm text-navy-600 hover:text-navy-500">Lupa password?</a>
              </div>

              <Button 
                type="submit" 
                className="w-full premium-gradient text-white hover:scale-105 transition-transform professional-shadow"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Masuk"}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Belum punya akun?{' '}
              <button 
                onClick={() => setLocation('/register-student')}
                className="text-primary hover:underline font-medium"
              >
                Daftar sebagai siswa
              </button>
              {' atau '}
              <button 
                onClick={() => setLocation('/register-teacher')}
                className="text-primary hover:underline font-medium"
              >
                daftar sebagai guru
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
