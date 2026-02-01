import { FileText, CreditCard, Users, Baby, Activity } from "lucide-react";
import headerBg from "@/assets/header-bg.png";

const Tim = () => {
  const requirements = [
    {
      title: "Pemeriksaan Umum",
      icon: Activity,
      items: [
        "Membawa Kartu Tanda Penduduk (KTP) asli / fotokopi",
        "Membawa Kartu Keluarga (KK) jika belum memiliki KTP",
        "Membawa Kartu BPJS / KIS (jika ada)",
        "Membawa kartu berobat (bagi pasien lama)"
      ]
    },
    {
      title: "Pemeriksaan Ibu Hamil & Anak",
      icon: Baby,
      items: [
        "Membawa Buku KIA (Kesehatan Ibu dan Anak)",
        "Membawa KTP Suami & Istri",
        "Membawa Kartu Keluarga (KK)",
        "Membawa Kartu BPJS / KIS (jika ada)"
      ]
    },
    {
      title: "Pelayanan Posyandu / Posbindu",
      icon: Users,
      items: [
        "Membawa buku catatan kesehatan lansia (untuk Posbindu)",
        "Membawa buku penimbangan balita (untuk Posyandu)",
        "Membawa identitas diri (KTP/KK)"
      ]
    }
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
              Informasi Layanan
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Persyaratan <span className="text-gradient">Administrasi</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Berikut adalah dokumen dan persyaratan yang perlu Anda siapkan
              sebelum mendapatkan pelayanan kesehatan di Ponkesdes.
            </p>
          </div>
        </div>
      </div>

      {/* Requirements Grid */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                <div className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 text-primary-foreground shadow-soft">
                    <req.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-4">{req.title}</h3>

                  <ul className="space-y-3">
                    {req.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-16 bg-secondary/50 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Penting Untuk Diperhatikan
            </h2>
            <p className="text-muted-foreground mb-6">
              Pastikan seluruh dokumen yang dibawa masih berlaku. Untuk pasien gawat darurat,
              penanganan medis akan didahulukan sebelum pengurusan administrasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tim;
