import {
  Stethoscope,
  Baby,
  Syringe,
  Heart,
  Pill,
  Clipboard,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import headerBg from "@/assets/header-bg.png";
import { branding } from "@/config/branding";

const Layanan = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Pemeriksaan Umum",
      description: "Layanan pemeriksaan kesehatan umum untuk semua usia dengan tenaga medis profesional.",
      details: [
        "Pemeriksaan tekanan darah",
        "Pengukuran suhu tubuh",
        "Pemeriksaan fisik",
        "Konsultasi keluhan kesehatan"
      ]
    },
    {
      icon: Baby,
      title: "Kesehatan Ibu & Anak",
      description: "Pelayanan kesehatan ibu hamil, bayi, dan balita termasuk imunisasi dasar lengkap.",
      details: [
        "Pemeriksaan kehamilan (ANC)",
        "Penimbangan balita",
        "Pemberian vitamin",
        "Konseling ASI eksklusif"
      ]
    },
    {
      icon: Syringe,
      title: "Imunisasi",
      description: "Program imunisasi dasar dan lanjutan untuk anak-anak sesuai jadwal nasional.",
      details: [
        "BCG, DPT, Polio",
        "Hepatitis B",
        "Campak, MR",
        "Imunisasi lanjutan"
      ]
    },
    {
      icon: Heart,
      title: "Program Posbindu",
      description: "Deteksi dini penyakit tidak menular seperti hipertensi dan diabetes mellitus.",
      details: [
        "Pemeriksaan gula darah",
        "Pemeriksaan kolesterol",
        "Pengukuran lingkar perut",
        "Edukasi gaya hidup sehat"
      ]
    },
    {
      icon: Pill,
      title: "Pemberian Obat",
      description: "Penyediaan obat-obatan esensial untuk pengobatan penyakit ringan.",
      details: [
        "Obat-obatan generik",
        "Vitamin dan suplemen",
        "Obat P3K",
        "Obat program pemerintah"
      ]
    },
    {
      icon: Clipboard,
      title: "Konsultasi Kesehatan",
      description: "Layanan konsultasi dan edukasi kesehatan untuk masyarakat desa.",
      details: [
        "Konsultasi gizi",
        "Edukasi kesehatan",
        "Penyuluhan kesehatan",
        "Rujukan ke fasilitas lanjutan"
      ]
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <div
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-background/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <span className="inline-block px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-4">
              Layanan Kami
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Pelayanan Kesehatan <span className="text-gradient">Lengkap</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Kami menyediakan berbagai layanan kesehatan dasar untuk memenuhi kebutuhan
              kesehatan masyarakat desa secara menyeluruh.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 md:p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${branding.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 hover:text-brand-yellow transition-all duration-200"
                >
                  Hubungi Kami
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layanan;
