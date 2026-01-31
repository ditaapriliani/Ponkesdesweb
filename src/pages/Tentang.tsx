import { CheckCircle, Target, Eye, Award, Users, Heart } from "lucide-react";

const Tentang = () => {
  const features = [
    "Tenaga kesehatan profesional dan berpengalaman",
    "Pelayanan ramah dan bersahabat",
    "Fasilitas kesehatan yang memadai",
    "Obat-obatan berkualitas",
    "Biaya terjangkau untuk masyarakat",
    "Jam operasional yang fleksibel",
  ];

  const achievements = [
    { icon: Users, value: "1000+", label: "Pasien Terlayani" },
    { icon: Award, value: "10+", label: "Tahun Pengalaman" },
    { icon: Heart, value: "5+", label: "Tenaga Medis" },
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <span className="inline-block px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-4">
              Tentang Kami
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Mitra Kesehatan <span className="text-gradient">Keluarga Anda</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ponkesdes hadir untuk memberikan pelayanan kesehatan dasar yang berkualitas 
              kepada seluruh masyarakat desa.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* About Content */}
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Apa Itu Ponkesdes?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ponkesdes (Pondok Kesehatan Desa) adalah fasilitas kesehatan tingkat pertama yang 
                  didirikan untuk memberikan pelayanan kesehatan dasar kepada masyarakat desa. 
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Kami berkomitmen untuk meningkatkan derajat kesehatan masyarakat melalui pelayanan 
                  yang profesional, ramah, dan terjangkau. Dengan tenaga kesehatan yang berpengalaman 
                  dan fasilitas yang memadai, kami siap melayani kebutuhan kesehatan Anda.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Keunggulan Kami</h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                {achievements.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <span className="block text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div className="space-y-6 animate-slide-in-right">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Visi</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi fasilitas kesehatan desa yang unggul dalam memberikan pelayanan 
                  kesehatan dasar yang berkualitas, merata, dan terjangkau untuk seluruh 
                  lapisan masyarakat.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Misi</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Memberikan pelayanan kesehatan yang profesional dan berkualitas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Meningkatkan kesadaran masyarakat tentang pentingnya kesehatan
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Menjalin kemitraan dengan berbagai pihak untuk peningkatan kesehatan
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Melaksanakan program kesehatan promotif dan preventif
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Memberikan edukasi kesehatan kepada masyarakat secara berkelanjutan
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-4">Sejarah Singkat</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ponkesdes didirikan sebagai upaya pemerintah untuk mendekatkan layanan kesehatan 
                  kepada masyarakat desa. Dengan fokus pada pelayanan kesehatan dasar, kami telah 
                  melayani ribuan pasien dari berbagai kalangan dan usia selama lebih dari satu dekade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tentang;
