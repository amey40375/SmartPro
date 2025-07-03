import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { addLangganan } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscriptionModal = ({ open, onOpenChange }: SubscriptionModalProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await addLangganan({
        userId: user.uid,
        status: 'pending',
      });
      
      toast({
        title: "Permintaan berhasil!",
        description: "Permintaan langganan berhasil dikirim! Menunggu konfirmasi admin.",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengirim permintaan langganan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "Akses ke semua materi pembelajaran",
    "Kuis interaktif unlimited",
    "Sertifikat digital resmi",
    "Chat langsung dengan guru",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md mx-4">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="text-gold-600 w-8 h-8" />
          </div>
          <DialogTitle className="text-2xl font-bold text-navy-900 mb-2">
            Langganan Premium
          </DialogTitle>
          <p className="text-slate-600">Akses semua materi dan fitur eksklusif</p>
        </DialogHeader>

        <div className="space-y-4 my-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-slate-700">{feature}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-navy-900">Rp 99.000</div>
          <div className="text-slate-600">per bulan</div>
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full bg-gold-500 hover:bg-gold-600"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Ajukan Langganan"}
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
        </div>

        <p className="text-xs text-slate-500 text-center mt-4">
          *Langganan akan diaktifkan setelah konfirmasi admin
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
