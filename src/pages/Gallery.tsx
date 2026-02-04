import { useState, useEffect } from "react";
import headerBg from "@/assets/header-bg.png";
import { supabase } from "@/lib/supabaseClient";

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  created_at: string;
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading gallery:', error);
        setLoading(false);
        return;
      }

      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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
              Galeri Kami
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Dokumentasi <span className="text-gradient">Kegiatan</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Dokumentasi berbagai kegiatan pelayanan dan pengabdian kesehatan masyarakat di Ponkesdes.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Memuat galeri...</p>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Belum ada gambar di galeri</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in flex flex-col bg-card border border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-foreground font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {new Date(item.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
