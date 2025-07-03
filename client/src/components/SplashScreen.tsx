import { useEffect } from "react";
import { useLocation } from "wouter";

const SplashScreen = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/landing");
    }, 5000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center z-50">
      <div className="text-center fade-in">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            Smart<span className="text-gold-500">Pro</span>
          </h1>
          <p className="text-gold-400 text-lg font-medium">Belajar Lebih Pintar, Raih Masa Depan Hebat</p>
        </div>
        <div className="mb-8">
          <div className="loading-spinner w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
        <p className="text-slate-300 text-sm">by Arvin Erlangga</p>
      </div>
    </div>
  );
};

export default SplashScreen;
