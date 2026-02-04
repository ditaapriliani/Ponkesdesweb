# Setup Guide untuk Ponkesdes App

## Yang sudah selesai ✅

1. ✅ Instalasi Supabase library (`@supabase/supabase-js`)
2. ✅ Integrasi Supabase client di `src/lib/supabaseClient.ts`
3. ✅ Halaman Login (`/login`) - untuk admin
4. ✅ Halaman Admin Dashboard (`/admin`) - upload & hapus galeri
5. ✅ Halaman Gallery publik (`/gallery`) - menampilkan galeri ke publik
6. ✅ Routes terintegrasi di `src/App.tsx`

## Setup Supabase yang HARUS dilakukan

### 1. Login ke Supabase Console
Buka: https://app.supabase.com

### 2. Buat Storage Bucket
- Nama: `gallery-images`
- Pilih "Public" agar gambar bisa diakses publik
- Buat bucket

### 3. Buat Tabel Database
Jalankan SQL query ini di Supabase SQL Editor:

```sql
CREATE TABLE gallery (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable public read access
CREATE POLICY "Enable read access for all users" ON gallery
  FOR SELECT USING (true);

-- Enable insert/update/delete untuk authenticated users only
CREATE POLICY "Enable insert for authenticated users" ON gallery
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON gallery
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON gallery
  FOR DELETE USING (auth.role() = 'authenticated');
```

### 4. Setup Authentication
- Go to Authentication > Providers
- Enable Email auth
- Buat user untuk testing:
  - Email: `ponkesdes.wiloso@gmail.com`
  - Password: `ponkesdes123`

### 5. Storage Policy
Di Supabase > Storage > gallery-images > Policies:

```sql
-- Public read
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'gallery-images' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete
CREATE POLICY "Authenticated Delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'gallery-images' 
    AND auth.role() = 'authenticated'
  );
```

## Cara Menggunakan App

### Public Access (Untuk Pengunjung)
- **Homepage**: `http://localhost:8081/#/`
- **Galeri**: `http://localhost:8081/#/gallery` (menampilkan gambar dari Supabase)
- **Layanan**: `http://localhost:8081/#/layanan`
- **Tentang**: `http://localhost:8081/#/tentang`
- **Kontak**: `http://localhost:8081/#/kontak`

### Admin Access
1. Go to `http://localhost:8081/#/login`
2. Login dengan:
   - Email: `ponkesdes.wiloso@gmail.com`
   - Password: `ponkesdes123`
3. Akan redirect ke Admin Dashboard (`#/admin`)
4. Upload gambar & judul
5. Lihat galeri yang sudah diupload
6. Hapus gambar jika perlu

## Struktur File

```
src/
  pages/
    Login.tsx              # Halaman login admin
    Login.css              # Styling login
    AdminDashboard.tsx     # Dashboard upload & hapus
    AdminDashboard.css     # Styling admin
    Gallery.tsx            # Galeri publik (ambil dari Supabase)
    Gallery.css            # Styling gallery
    ...
  lib/
    supabaseClient.ts      # Client Supabase configuration
  App.tsx                  # Routes: /login, /admin, /gallery, dsb
```

## Environment Variables
File `.env.local` (jika perlu):
```
VITE_SUPABASE_URL=https://fiwjdozedgbhnfpgfudv.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Untuk sekarang sudah hardcoded di `src/lib/supabaseClient.ts` (ok untuk development).

## Run Project

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build untuk production
npm run build
```

Dev server akan berjalan di: `http://localhost:8081/`

## Troubleshooting

### Blank Page
- Check browser console (F12) untuk error
- Pastikan Supabase URL dan key benar
- Pastikan Storage bucket `gallery-images` sudah dibuat

### Login Error
- Pastikan user `ponkesdes.wiloso@gmail.com` sudah dibuat di Supabase Auth
- Check password

### Gambar Tidak Muncul di Gallery
- Pastikan bucket `gallery-images` bersifat PUBLIC
- Pastikan RLS policies sudah benar

---

**Last Updated**: February 4, 2026
**Status**: Development Ready ✅
