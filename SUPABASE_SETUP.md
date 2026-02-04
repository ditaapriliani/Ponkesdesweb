# 🔧 Setup Supabase - Langkah Demi Langkah

## Error yang Terjadi
```
Could not find the 'title' column of 'gallery' in the schema cache
```

**Artinya**: Tabel `gallery` belum dibuat atau belum di-sync di cache Supabase.

---

## ✅ LANGKAH 1: Login ke Supabase Console

1. Buka: https://app.supabase.com
2. Login dengan akun Anda
3. Pilih project: `fiwjdozedgbhnfpgfudv` (sesuai URL di `supabaseClient.ts`)

---

## ✅ LANGKAH 2: Buat Storage Bucket

Pergi ke: **Storage** → **Buckets**

1. Klik **"New bucket"**
2. Name: `gallery-images`
3. Pilih **"Public"** (agar gambar bisa diakses publik)
4. Klik **"Create bucket"**

---

## ✅ LANGKAH 3: Buat Tabel Database

Pergi ke: **SQL Editor** → **New query**

Copy-paste SQL query ini:

```sql
-- Create gallery table
CREATE TABLE gallery (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index untuk faster query
CREATE INDEX gallery_created_at_idx ON gallery(created_at DESC);

-- Enable RLS
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public read (siapa saja bisa lihat)
CREATE POLICY "Public read access" ON gallery
  FOR SELECT USING (TRUE);

-- Policy 2: Authenticated insert (hanya user login yang bisa upload)
CREATE POLICY "Authenticated insert" ON gallery
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 3: Authenticated update (hanya user login yang bisa update)
CREATE POLICY "Authenticated update" ON gallery
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 4: Authenticated delete (hanya user login yang bisa delete)
CREATE POLICY "Authenticated delete" ON gallery
  FOR DELETE 
  USING (auth.role() = 'authenticated');
```

Klik **"Run"** untuk execute query.

---

## ✅ LANGKAH 4: Setup Storage Permissions

Pergi ke: **Storage** → **Buckets** → **gallery-images** → **Policies**

Klik **"New policy"** dan buat 3 policy ini:

### Policy 1: Public Read
```
Klik "New policy"
→ Pilih "For SELECT"
→ Name: "Public read"
→ Paste ini di "Expression":

(bucket_id = 'gallery-images')

→ Create policy
```

### Policy 2: Authenticated Upload
```
Klik "New policy"
→ Pilih "For INSERT"
→ Name: "Authenticated upload"
→ Paste ini di "Expression":

(bucket_id = 'gallery-images' AND auth.role() = 'authenticated')

→ Create policy
```

### Policy 3: Authenticated Delete
```
Klik "New policy"
→ Pilih "For DELETE"
→ Name: "Authenticated delete"
→ Paste ini di "Expression":

(bucket_id = 'gallery-images' AND auth.role() = 'authenticated')

→ Create policy
```

---

## ✅ LANGKAH 5: Setup Authentication

Pergi ke: **Authentication** → **Providers**

1. Pastikan **"Email"** sudah enabled (biasanya default)
2. Klik **"Email"** untuk expand
3. Pastikan setting OK

---

## ✅ LANGKAH 6: Buat User Test

Pergi ke: **Authentication** → **Users** → **Add user**

1. **Email**: `ponkesdes.wiloso@gmail.com`
2. **Password**: `ponkesdes123`
3. **Email confirmed**: Centang ☑️
4. Klik **"Create user"**

---

## ✅ LANGKAH 7: Test Koneksi

Refresh halaman aplikasi:
```
http://localhost:8081/
```

1. Klik **"Login Admin"** button
2. Input:
   - Email: `ponkesdes.wiloso@gmail.com`
   - Password: `ponkesdes123`
3. Klik **"Login"**
4. Seharusnya redirect ke Admin Dashboard

---

## ✅ LANGKAH 8: Test Upload

Di Admin Dashboard:

1. Klik **"Pilih Gambar"** → select file gambar
2. Input **"Judul Gambar"** → contoh: "Pemeriksaan Kesehatan"
3. Klik **"Upload ke Galeri"**
4. Tunggu sampai berhasil

---

## Verifikasi Setup

### Cek Tabel Database
Pergi ke: **Table Editor** → Pilih tabel `gallery`
- Seharusnya ada columns: `id`, `title`, `image_url`, `created_at`

### Cek Storage Files
Pergi ke: **Storage** → **gallery-images**
- Seharusnya ada file gambar yang sudah diupload

### Cek Data di Table
Pergi ke: **Table Editor** → `gallery`
- Seharusnya ada rows dengan data yang diupload

---

## Troubleshooting

### ❌ Error: "relation 'gallery' does not exist"
**Solusi**: Tabel `gallery` belum dibuat. Jalankan SQL query di LANGKAH 3

### ❌ Error: "permission denied"
**Solusi**: RLS policies belum setup dengan benar. Jalankan SQL query di LANGKAH 3

### ❌ Error: "Could not find the 'title' column"
**Solusi**: Sama seperti di atas - tabel belum dibuat

### ❌ Upload berhasil tapi gambar tidak muncul di Gallery
**Solusi**: 
1. Check apakah storage bucket `gallery-images` sudah public
2. Refresh halaman `/gallery`
3. Check RLS policies storage

### ❌ Login error "Invalid credentials"
**Solusi**:
1. Pastikan user sudah dibuat di LANGKAH 6
2. Pastikan email & password benar
3. Pastikan "Email confirmed" = checked

### ❌ Gambar upload error "Bucket not found"
**Solusi**: 
1. Pastikan bucket `gallery-images` sudah dibuat (LANGKAH 2)
2. Nama bucket harus lowercase tanpa spasi

---

## Quick Checklist

```
Database Setup:
- [ ] Login ke Supabase Console
- [ ] Create bucket: gallery-images
- [ ] Run SQL query untuk buat tabel gallery
- [ ] Setup storage policies (public read + auth upload/delete)
- [ ] Enable authentication email
- [ ] Create test user

Testing:
- [ ] Refresh app di browser
- [ ] Click "Login Admin" button
- [ ] Login dengan test credentials
- [ ] Upload gambar
- [ ] Check di /gallery
- [ ] Delete gambar
- [ ] Logout
```

---

## File Reference

- **Config**: [src/lib/supabaseClient.ts](src/lib/supabaseClient.ts)
- **Login**: [src/pages/Login.tsx](src/pages/Login.tsx)
- **Admin**: [src/pages/AdminDashboard.tsx](src/pages/AdminDashboard.tsx)
- **Gallery**: [src/pages/Gallery.tsx](src/pages/Gallery.tsx)

---

## Support

Jika masih ada error:
1. Check browser console (F12 → Console tab)
2. Lihat error message yang detail
3. Compare dengan checklist di atas

**Status**: Siap untuk setup Supabase ✅
