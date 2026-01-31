import { ArrowRight, Heart, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-ponkesdes.jpg";

const Beranda = () => {
  const stats = [
    { icon: Heart, value: "1000+", label: "Pasien Dilayani" },
    { icon: Users, value: "5+", label: "Tenaga Medis" },
    { icon: Clock, value: "10+", label: "Tahun Melayani" },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Layanan Kesehatan Desa Terpercaya
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Kesehatan Anda,{" "}
              <span className="text-gradient">Prioritas Kami</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Ponkesdes hadir memberikan layanan kesehatan dasar yang berkualitas untuk seluruh 
              masyarakat desa. Kami berkomitmen menjadi mitra kesehatan keluarga Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/layanan">
                  Lihat Layanan Kami
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/kontak">Jadwal Pelayanan</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-3xl overflow-hidden shadow-card">
              <img
                src={heroImage}
                alt="Ponkesdes - Pondok Kesehatan Desa"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-card animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Buka Sekarang</p>
                  <p className="text-sm text-muted-foreground">08:00 - 16:00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Beranda;
