# 🔐 Login Admin - Quick Guide

## Akses Halaman Login

Sekarang ada beberapa cara untuk akses halaman login:

### 1. **Via Button di Header** (RECOMMENDED)
- Di setiap halaman, klik button **"Login Admin"** di top-right (Desktop) atau di mobile menu
- Akan redirect ke halaman login

### 2. **Direct URL**
- Ketik langsung di browser: `http://localhost:8081/#/login`

### 3. **Via Gallery Page**
- Buka `/gallery` → scroll ke bawah → click "Login Admin" button

## Login Credentials (Untuk Testing)

**Email**: `ponkesdes.wiloso@gmail.com`
**Password**: `ponkesdes123`

> ⚠️ **Catatan**: Ini adalah credentials test. Setelah Supabase setup, buat user baru sesuai kebutuhan.

## Halaman Login

![Login Flow]
```
User di Halaman Publik
         ↓
Click "Login Admin" Button (di Header)
         ↓
Redirect ke /login
         ↓
Input Email & Password
         ↓
Click "Login" Button
         ↓
✅ Login Berhasil → Redirect ke /admin
❌ Login Gagal → Tampil error message
```

## Admin Dashboard

Setelah login berhasil:

### 1. **Upload Gambar**
```
1. Klik "Pilih Gambar" → select file
2. Input "Judul Gambar"
3. Klik "Upload ke Galeri"
4. Wait for confirmation
```

### 2. **Lihat Galeri**
```
1. Scroll ke bawah
2. Lihat semua gambar yang sudah diupload
3. Setiap gambar punya button "Hapus"
```

### 3. **Hapus Gambar**
```
1. Find gambar yang ingin dihapus
2. Klik button "Hapus"
3. Confirm dialog
4. Gambar akan dihapus dari storage & database
```

### 4. **Logout**
```
1. Klik button "Logout" di top-right
2. Redirect ke /login
3. Session terminated
```

## Flow Diagram

```
┌─────────────────────────────────────┐
│  Homepage / Public Pages            │
│  - Button "Login Admin" di Header   │
└────────────┬────────────────────────┘
             │ Click
             ↓
┌─────────────────────────────────────┐
│  Login Page (/login)                │
│  - Email input                      │
│  - Password input                   │
│  - Login button                     │
└────────────┬────────────────────────┘
             │ Submit
             ↓
      [Supabase Auth]
             │
    ┌────────┴────────┐
    │                 │
Success              Fail
    │                 │
    ↓                 ↓
┌──────────┐   ┌──────────────┐
│ /admin   │   │ Error Message│
│ Dashboard   │   │ (Stay on page)
└──────────┘   └──────────────┘
    │
    ├─→ Upload Gambar
    ├─→ View Gallery
    ├─→ Delete Gambar
    └─→ Logout Button
         │
         ↓ Click
      [Redirect to /login]
```

## Buttons Location

### Desktop (1024px+)
- **Login Button**: Top-right header, next to "Hubungi Kami"
- **Logout Button**: Top-right admin dashboard

### Mobile (< 1024px)
- **Login Button**: Inside mobile menu (hamburger icon)
- **Logout Button**: Top-right admin dashboard

## Protected Routes

Halaman admin (`/admin`) adalah **protected route**:
- Jika belum login → Auto redirect ke `/login`
- Jika login tetapi session expired → Redirect ke `/login`
- Hanya user authenticated yang bisa akses

## Session Management

```
✅ Login Successful
   └─ User session stored locally
   └─ Redirect to /admin

🔄 Refresh Page
   └─ Session dipersist (tidak perlu login ulang)

❌ Logout
   └─ Session cleared
   └─ Redirect to /login

⏰ Session Expired
   └─ Auto check saat akses /admin
   └─ Redirect to /login jika expired
```

## Troubleshooting

### Login Error: "Invalid credentials"
```
✗ Email atau password salah
✗ User belum dibuat di Supabase
✗ Supabase project tidak aktif

→ Solution: Setup Supabase + create user (lihat SETUP_GUIDE.md)
```

### Login Error: "Network error"
```
✗ Dev server tidak running
✗ Supabase URL salah di supabaseClient.ts
✗ Internet connection issue

→ Solution: Check dev server running & Supabase config
```

### Can't access /admin
```
✗ Belum login
✗ Session expired
✗ Browser cache issue

→ Solution: Clear cookies/cache → Login again
```

### Logout button tidak muncul
```
✗ Browser CSS loading issue
✗ Component rendering error

→ Solution: Refresh page → Check console (F12)
```

## Best Practices

✅ **DO:**
- Close browser tab setelah selesai edit
- Logout sebelum meninggalkan admin page
- Check connection sebelum upload gambar
- Use strong password

❌ **DON'T:**
- Share login credentials
- Login di perangkat publik tanpa logout
- Upload gambar > 5MB
- Close browser saat upload proses

## Next Steps

1. ✅ Restart dev server jika sudah di-edit
2. ✅ Buka halaman public (homepage)
3. ✅ Klik "Login Admin" button
4. ✅ Input credentials
5. ✅ Upload gambar untuk test
6. ✅ Lihat di `/gallery`
7. ✅ Logout

---

**Status**: ✅ Login & Logout Implemented
**Location**: 
- Login Form: [src/pages/Login.tsx](src/pages/Login.tsx)
- Admin Dashboard: [src/pages/AdminDashboard.tsx](src/pages/AdminDashboard.tsx)
- Header: [src/components/Header.tsx](src/components/Header.tsx)
