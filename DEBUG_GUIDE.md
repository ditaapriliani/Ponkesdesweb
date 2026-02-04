# 🐛 Debugging Guide

## Error: "Could not find the 'title' column of 'gallery' in the schema cache"

### Penyebab
1. ❌ Tabel `gallery` belum dibuat di database Supabase
2. ❌ Cache Supabase belum ter-refresh setelah membuat tabel
3. ❌ SQL query tidak di-execute dengan benar

### Solusi

**Step 1**: Buka Supabase Console
- https://app.supabase.com
- Select project Anda

**Step 2**: Buka SQL Editor
- Klik **"SQL Editor"** di sidebar
- Klik **"New query"**

**Step 3**: Jalankan SQL untuk Buat Tabel
Copy-paste ini:

```sql
CREATE TABLE IF NOT EXISTS gallery (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

- Klik **"Run"** (atau Ctrl+Enter)
- Tunggu sampai selesai (biasanya 1-2 detik)

**Step 4**: Setup RLS Policies
Run ini juga:

```sql
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON gallery
  FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated insert" ON gallery
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated update" ON gallery
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete" ON gallery
  FOR DELETE USING (auth.role() = 'authenticated');
```

**Step 5**: Verify di Table Editor
- Klik **"Table Editor"** di sidebar
- Lihat apakah tabel `gallery` sudah muncul
- Klik tabel → lihat columns: `id`, `title`, `image_url`, `created_at`

**Step 6**: Refresh App
- Buka browser
- Refresh halaman app: `http://localhost:8081/#/admin`
- Try upload lagi

---

## Checklist Database

```
✅ Tabel gallery ada?
   → Buka SQL Editor → Run: SELECT * FROM gallery;

✅ Columns benar?
   → Harus ada: id, title, image_url, created_at

✅ RLS enabled?
   → Buka Table Editor → Pilih gallery → klik "..." → info
   → Lihat RLS status: ON/OFF

✅ Policies aktif?
   → Buka gallery table → klik "Policies"
   → Lihat 4 policies: read, insert, update, delete
```

---

## Error Messages Reference

| Error | Penyebab | Solusi |
|-------|----------|--------|
| Could not find the 'title' column | Tabel belum dibuat | Jalankan CREATE TABLE query |
| relation 'gallery' does not exist | Tabel belum dibuat | Sama seperti di atas |
| permission denied for schema public | RLS policy salah | Fix RLS policies |
| bucket 'gallery-images' does not exist | Storage bucket belum dibuat | Create bucket di Storage |
| Bucket not found | Storage bucket nama salah | Nama harus: gallery-images |
| Invalid credentials | Email/password salah | Check user di Auth |
| PostgreSQL error: new row violates... | Column value invalid | Check data types |

---

## Browser Console Debugging

Buka DevTools: **F12** → **Console** tab

Cari error messages:
- `Could not find the 'title' column...` → database issue
- `bucket_id does not exist` → storage issue
- `Invalid JWT` → authentication issue
- `Network error` → server/internet issue

---

## Quick Test Query

Buka SQL Editor, run ini untuk test:

```sql
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'gallery'
);

-- Insert test data (jika table sudah ada)
INSERT INTO gallery (title, image_url) 
VALUES ('Test Image', 'https://example.com/test.jpg');

-- Check data
SELECT * FROM gallery;

-- Delete test data
DELETE FROM gallery WHERE title = 'Test Image';
```

---

## Storage Bucket Check

Pergi ke **Storage** → **Buckets**:

```
Harus ada bucket: gallery-images
├─ Visibility: Public ✅
└─ Policies:
   ├─ SELECT: Public ✅
   ├─ INSERT: Authenticated ✅
   ├─ UPDATE: Authenticated ✅
   └─ DELETE: Authenticated ✅
```

---

## Authentication Check

Pergi ke **Authentication** → **Users**:

```
Harus ada user:
- Email: ponkesdes.wiloso@gmail.com
- Status: Confirmed ✅
- Password: (hidden)
```

---

## Step-by-Step Fix

Jika masih error, ikuti ini urut-urutan:

```
1. [ ] Buka Supabase Console
2. [ ] Login ke project
3. [ ] Buka SQL Editor
4. [ ] Copy-paste CREATE TABLE query
5. [ ] Klik "Run"
6. [ ] Copy-paste RLS policies query
7. [ ] Klik "Run"
8. [ ] Buka Table Editor → lihat gallery table
9. [ ] Buka Storage → lihat gallery-images bucket
10. [ ] Refresh browser → F5
11. [ ] Try upload gambar lagi
12. [ ] Check /gallery page
```

---

## Network Request Debugging

Buka DevTools → **Network** tab:

Saat upload, cari:
- Request ke `storage.googleapis.com` → upload file
- Request ke `*.supabase.co` → API call

Klik request → lihat:
- Status code: harus 200/201 (berhasil)
- Response: lihat error message

---

## Common Success Indicators

✅ File gambar berhasil upload:
```
POST /storage/v1/object/gallery-images/img_*
Status: 200
Response: {name: "img_...", bucketId: "gallery-images"}
```

✅ Data berhasil simpan ke DB:
```
POST /rest/v1/gallery
Status: 201
Response: [{id: 1, title: "...", image_url: "...", created_at: "..."}]
```

---

## Final Verification

Setelah setup, test ini:

```
1. Login ke admin
2. Upload gambar → check admin dashboard
3. Buka /gallery → lihat gambar muncul
4. Klik refresh → gambar still there?
5. Delete gambar → confirmed?
6. Buka /gallery → gambar sudah hilang?
```

Jika semua ✅, setup berhasil!

---

**Last Updated**: February 4, 2026
**Status**: Debugging Guide Ready ✅
