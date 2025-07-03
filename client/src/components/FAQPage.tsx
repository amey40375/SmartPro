import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const FAQPage = () => {
  const [, setLocation] = useLocation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Apa itu SmartPro?",
      answer: "SmartPro adalah platform belajar online modern dengan guru berpengalaman yang menyediakan materi pembelajaran interaktif, kuis, dan sertifikat digital untuk membantu Anda meraih masa depan yang lebih baik."
    },
    {
      question: "Apakah semua layanan gratis?",
      answer: "SmartPro menyediakan beberapa materi gratis untuk semua pengguna. Namun, untuk mengakses materi premium dan fitur-fitur canggih, Anda perlu berlangganan dengan harga yang sangat terjangkau."
    },
    {
      question: "Apakah saya bisa mendapat sertifikat?",
      answer: "Ya, setelah menyelesaikan kuis dan materi pembelajaran dengan nilai yang memuaskan, Anda akan mendapatkan sertifikat digital yang dapat diverifikasi melalui QR code dan dapat digunakan untuk keperluan akademis atau profesional."
    },
    {
      question: "Bagaimana jika saya lupa password?",
      answer: "Gunakan fitur \"Lupa Password\" di halaman login. Kami akan mengirimkan link reset password ke email yang terdaftar. Ikuti instruksi dalam email untuk membuat password baru."
    },
    {
      question: "Bisakah saya mengakses dari mobile?",
      answer: "Tentu saja! SmartPro dirancang responsif dan dapat diakses dengan sempurna dari desktop, tablet, maupun smartphone. Pengalaman belajar yang optimal di semua perangkat."
    },
    {
      question: "Bagaimana cara menjadi guru di SmartPro?",
      answer: "Untuk menjadi guru di SmartPro, daftarkan diri Anda melalui formulir \"Daftar Guru\" di halaman utama. Setelah mendaftar, admin akan melakukan verifikasi terhadap kredensial dan keahlian Anda sebelum akun diaktifkan."
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
              <h1 className="text-4xl font-bold text-navy-900 mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-slate-600">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border border-slate-200">
                  <Collapsible>
                    <CollapsibleTrigger
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="font-semibold text-navy-900">{faq.question}</h3>
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                          openItems.includes(index) ? 'transform rotate-180' : ''
                        }`} 
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-6 pb-4">
                      <p className="text-slate-600">{faq.answer}</p>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center bg-navy-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Masih ada pertanyaan?</h3>
              <p className="text-slate-600 mb-4">Hubungi tim support kami untuk mendapatkan bantuan lebih lanjut</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-navy-600 hover:bg-navy-700 text-white">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FAQPage;
