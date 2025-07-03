import { useLocation } from "wouter";
import { ArrowLeft, Check, BookOpen, Award, MessageCircle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  const [, setLocation] = useLocation();

  const features = [
    { icon: BookOpen, title: "Pembelajaran Interaktif", description: "Kuis dan materi yang engaging untuk meningkatkan pemahaman", color: "text-purple-600 bg-purple-100" },
    { icon: Award, title: "Sertifikat Digital", description: "Sertifikat resmi dengan QR code untuk verifikasi", color: "text-gold-600 bg-gold-100" },
    { icon: MessageCircle, title: "Live Chat", description: "Konsultasi langsung dengan guru berpengalaman", color: "text-blue-600 bg-blue-100" },
    { icon: Smartphone, title: "Responsif", description: "Akses dari desktop maupun mobile dengan mudah", color: "text-green-600 bg-green-100" },
  ];

  const missions = [
    "Menyediakan materi pembelajaran berkualitas tinggi dari guru-guru berpengalaman",
    "Menciptakan pengalaman belajar yang interaktif dan menyenangkan",
    "Memberikan akses pendidikan yang mudah dan terjangkau untuk semua kalangan",
    "Menggunakan teknologi terdepan untuk meningkatkan kualitas pembelajaran",
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
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-navy-900 mb-4">
                Tentang Smart<span className="text-gold-500">Pro</span>
              </h1>
              <p className="text-xl text-slate-600">Platform pembelajaran online terdepan di Indonesia</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">Visi Kami</h2>
                <p className="text-slate-600 leading-relaxed">
                  Menjadi platform pembelajaran online terdepan yang memungkinkan setiap individu untuk 
                  belajar lebih pintar dan meraih masa depan yang hebat melalui teknologi pendidikan terkini.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">Misi Kami</h2>
                <ul className="space-y-2">
                  {missions.map((mission, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-slate-600">{mission}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">Fitur Unggulan</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl p-6">
                      <div className="flex items-center mb-3">
                        <div className={`w-8 h-8 ${feature.color.split(' ')[1]} rounded-lg flex items-center justify-center mr-3`}>
                          <feature.icon className={`w-5 h-5 ${feature.color.split(' ')[0]}`} />
                        </div>
                        <h3 className="font-semibold text-navy-900">{feature.title}</h3>
                      </div>
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center bg-navy-50 rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">Tim Pengembang</h2>
                <p className="text-slate-600 mb-4">
                  Platform SmartPro dikembangkan dengan dedikasi tinggi untuk memberikan pengalaman belajar terbaik
                </p>
                <p className="text-lg font-semibold text-gold-600">by Arvin Erlangga</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AboutPage;
