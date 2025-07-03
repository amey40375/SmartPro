import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { signUp } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const registerSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  sekolah: z.string().min(2, "Nama sekolah wajib diisi"),
  kelas: z.string().min(1, "Kelas wajib dipilih"),
});

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterStudentPage = () => {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nama: "",
      email: "",
      password: "",
      sekolah: "",
      kelas: "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, {
        nama: data.nama,
        role: 'siswa',
        status: 'active',
        saldo: 0,
        sekolah: data.sekolah,
        kelas: data.kelas,
      });
      
      toast({
        title: "Pendaftaran berhasil!",
        description: "Akun siswa berhasil dibuat. Silakan login.",
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
          <p className="text-slate-600">Daftar sebagai Siswa</p>
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
                name="sekolah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sekolah</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama sekolah" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="kelas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kelas</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kelas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="10">Kelas 10</SelectItem>
                        <SelectItem value="11">Kelas 11</SelectItem>
                        <SelectItem value="12">Kelas 12</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-gold-500 hover:bg-gold-600"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Daftar Sebagai Siswa"}
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

export default RegisterStudentPage;
