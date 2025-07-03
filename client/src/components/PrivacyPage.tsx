import { useLocation } from "wouter";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPage = () => {
  const [, setLocation] = useLocation();

  const sections = [
    {
      title: "1. Informasi yang Kami Kumpulkan",
      content: [
        "SmartPro mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:",
        "• Informasi akun (nama, email, password)",
        "• Informasi profil (sekolah, kelas, bidang keahlian)",
        "• Data pembelajaran (progress, nilai kuis, materi yang diakses)",
        "• Komunikasi dengan platform (chat, feedback)"
      ]
    },
    {
      title: "2. Penggunaan Informasi",
      content: [
        "Kami menggunakan informasi yang dikumpulkan untuk:",
        "• Menyediakan dan memelihara layanan SmartPro",
        "• Memproses pendaftaran dan autentikasi pengguna",
        "• Melacak progress pembelajaran dan memberikan feedback",
        "• Menghasilkan sertifikat digital",
        "• Berkomunikasi dengan pengguna tentang layanan kami",
        "• Meningkatkan dan mengembangkan platform"
      ]
    },
    {
      title: "3. Perlindungan Data",
      content: [
        "Kami menggunakan teknologi Firebase yang menyediakan keamanan tingkat enterprise untuk melindungi data Anda. Semua data dienkripsi baik dalam transit maupun saat disimpan. Akses ke data dibatasi hanya untuk personel yang berwenang dan diperlukan untuk operasional layanan."
      ]
    },
    {
      title: "4. Berbagi Informasi",
      content: [
        "SmartPro tidak menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali dalam situasi berikut:",
        "• Untuk mematuhi hukum yang berlaku",
        "• Untuk melindungi hak dan keamanan pengguna lain",
        "• Dengan persetujuan eksplisit dari Anda"
      ]
    },
    {
      title: "5. Hak Pengguna",
      content: [
        "Anda memiliki hak untuk:",
        "• Mengakses dan memperbarui informasi pribadi Anda",
        "• Menghapus akun dan data pribadi Anda",
        "• Membatasi pemrosesan data pribadi Anda",
        "• Mendapatkan salinan data pribadi Anda"
      ]
    },
    {
      title: "6. Cookies dan Teknologi Tracking",
      content: [
        "SmartPro menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman pengguna, menganalisis penggunaan platform, dan menyediakan fitur yang dipersonalisasi. Anda dapat mengatur preferensi cookies melalui browser Anda."
      ]
    },
    {
      title: "7. Perubahan Kebijakan",
      content: [
        "Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan dinotifikasikan melalui platform dan/atau email. Penggunaan berkelanjutan terhadap layanan SmartPro setelah perubahan berlaku menunjukkan penerimaan Anda terhadap kebijakan yang diperbarui."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-navy-900">Smart<span className="text-gold-500">Pro</span></h1>
            <Button 
              variant="ghost"
              onClick={() => setLocation('/landing')}
              className="text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-navy-900 mb-4">Kebijakan Privasi</h1>
              <p className="text-slate-600">Terakhir diperbarui: Desember 2024</p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              {sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-2xl font-semibold text-navy-900 mb-4">{section.title}</h2>
                  <div className="text-slate-600 leading-relaxed space-y-2">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className={paragraph.startsWith('•') ? 'ml-6' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section>
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">8. Kontak</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami:
                </p>
                <div className="bg-slate-50 rounded-xl p-6">
                  <div className="space-y-2 text-slate-600">
                    <p className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-navy-600" />
                      Email: privacy@smartpro.id
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-navy-600" />
                      Telepon: +62 812-3456-7890
                    </p>
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-navy-600" />
                      Alamat: Jakarta, Indonesia
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyPage;
