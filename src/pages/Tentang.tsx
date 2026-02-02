import { CheckCircle, Target, Eye, Award, Users, Heart } from "lucide-react";
import nurseImage from "@/assets/nurse-1.jpg";
import doctorImage from "@/assets/doctor-1.jpg";
import bidanImage from "@/assets/bidan-1.jpg";
import headerBg from "@/assets/header-bg.png";

const Tentang = () => {
  const features = [
    "Tenaga kesehatan profesional dan berpengalaman",
    "Pelayanan ramah dan bersahabat",
    "Fasilitas kesehatan yang memadai",
    "Obat-obatan berkualitas",
    "Biaya terjangkau untuk masyarakat",
    "Jam operasional yang fleksibel",
  ];

  const team = [
    {
      name: "Ibu Frida",
      role: "Perawat Desa",
      image: bidanImage,
    },
    {
      name: "Ibu Wayan",
      role: "Bidan Desa",
      image: nurseImage,
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
        <div className="absolute inset-0 bg-background/70" />
        <div className="container mx-auto px-4 relative z-10">
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

              {/* Team Section */}
              <div className="pt-12 border-t border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">Tim Kesehatan Kami</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {team.map((member, index) => (
                    <div
                      key={index}
                      className="group bg-card rounded-xl overflow-hidden shadow-soft border border-border/50"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-white font-semibold text-sm">{member.name}</p>
                          <p className="text-white/80 text-xs">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  Terwujudnya Kabupaten Malang yang Maju , Sejahtera, Berdaya Saing dan Berkelanjutan dengan Semangat Gotong Royong berdasarkan Pancasila dalam Negara Kesatuan Republik Indonesia yang Bhineka Tunggal Ika.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Misi</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Mewujudkan kesejahteran rakyat membangun sumber daya manusia unggul.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-4">Tujuan</h3>
                <p className="text-muted-foreground leading-relaxed">
                 Menyelenggarakan pelayanan kesehatan yang berkualitas serta meningkatkan kesadaran, kemauan dan kemampuan hidup sehat bagi setiap orang yang bertempat tinggal di desa/kelurahan, agar terwujud derajat kesehatan masyarakat di desa/kelurahan yang setinggi-tingginya.
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
