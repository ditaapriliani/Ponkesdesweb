import nurseImage from "@/assets/nurse-1.jpg";
import doctorImage from "@/assets/doctor-1.jpg";
import bidanImage from "@/assets/bidan-1.jpg";

const Tim = () => {
  const team = [
    {
      name: "dr. Ahmad Wijaya",
      role: "Dokter Umum",
      image: doctorImage,
      description: "Dokter dengan pengalaman lebih dari 10 tahun di bidang kesehatan masyarakat.",
      education: "Fakultas Kedokteran Universitas Indonesia",
      specialization: "Kesehatan Masyarakat"
    },
    {
      name: "Siti Nurhaliza, Amd.Keb",
      role: "Bidan Desa",
      image: bidanImage,
      description: "Bidan profesional yang berpengalaman dalam pelayanan kesehatan ibu dan anak.",
      education: "Akademi Kebidanan",
      specialization: "Kesehatan Ibu & Anak"
    },
    {
      name: "Dewi Kartika, Amd.Kep",
      role: "Perawat",
      image: nurseImage,
      description: "Perawat terampil dengan dedikasi tinggi dalam merawat pasien.",
      education: "Akademi Keperawatan",
      specialization: "Keperawatan Umum"
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <span className="inline-block px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-4">
              Tim Kami
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Tenaga Kesehatan <span className="text-gradient">Profesional</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Didukung oleh tim tenaga kesehatan yang berpengalaman dan berdedikasi 
              untuk memberikan pelayanan terbaik bagi masyarakat.
            </p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-card mb-1">{member.name}</h3>
                    <span className="inline-block px-3 py-1 bg-primary rounded-full text-primary-foreground text-sm font-medium">
                      {member.role}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground">{member.description}</p>
                  <div className="space-y-2 pt-4 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground">Pendidikan:</span>
                      <p className="text-foreground font-medium">{member.education}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Spesialisasi:</span>
                      <p className="text-foreground font-medium">{member.specialization}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-secondary/50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Bergabung Dengan Tim Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Kami selalu terbuka untuk tenaga kesehatan profesional yang ingin berkontribusi 
              dalam pelayanan kesehatan masyarakat desa.
            </p>
            <p className="text-primary font-medium">
              Hubungi kami untuk informasi lebih lanjut
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tim;
