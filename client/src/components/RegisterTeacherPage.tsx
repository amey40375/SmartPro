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
import { signUp } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const registerSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  bidang_keahlian: z.string().min(2, "Bidang keahlian wajib diisi"),
});

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterTeacherPage = () => {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nama: "",
      email: "",
      password: "",
      bidang_keahlian: "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, {
        nama: data.nama,
        role: 'guru',
        status: 'pending',
        bidang_keahlian: data.bidang_keahlian,
      });
      
      toast({
        title: "Pendaftaran berhasil!",
        description: "Akun guru berhasil dibuat. Menunggu verifikasi admin sebelum dapat login.",
      });

      setLocation('/login');
    } catch (error: any) {
      toast({
        title: "Pendaftaran gagal",
        description: error.message || "Terjadi kesalahan saat mendaftar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center py-8">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-navy-900">
            Smart<span className="text-gold-500">Pro</span>
          </CardTitle>
          <p className="text-slate-600">Daftar sebagai Guru</p>
          <p className="text-xs text-slate-500">*Memerlukan verifikasi admin</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Masukkan email" {...field} />
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
                      <Input type="password" placeholder="Masukkan password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bidang_keahlian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bidang Keahlian</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Matematika, Fisika, Kimia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Daftar Sebagai Guru"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Sudah punya akun?{" "}
              <button 
                onClick={() => setLocation('/login')} 
                className="text-navy-600 hover:text-navy-500 font-semibold"
              >
                Masuk
              </button>
            </p>
          </div>
          
          <button 
            onClick={() => setLocation('/landing')} 
            className="mt-4 text-slate-500 text-sm hover:text-slate-700 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali ke beranda
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterTeacherPage;
