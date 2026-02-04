import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import './AdminDashboard.css'

interface GalleryItem {
  id: number
  title: string
  image_url: string
  created_at: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' }>({ text: '', type: 'success' })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageTitle, setImageTitle] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
    loadGallery()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
      } else {
        setUser(user)
      }
    } catch (error) {
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: '', type: 'success' }), 5000)
  }

  const loadGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading gallery:', error)
        return
      }

      setGallery(data || [])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!imageFile) {
      showMessage('Pilih gambar dulu!', 'error')
      return
    }

    if (!imageTitle.trim()) {
      showMessage('Masukkan judul gambar!', 'error')
      return
    }

    setUploading(true)

    try {
      // 1. Upload ke Storage
      const fileName = `img_${Date.now()}_${imageFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, imageFile)

      if (uploadError) {
        showMessage('Gagal upload gambar: ' + uploadError.message, 'error')
        setUploading(false)
        return
      }

      // 2. Dapatkan Public URL
      const { data: urlData } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName)

      const publicUrl = urlData.publicUrl

      // 3. Simpan ke Database
      const { error: dbError } = await supabase
        .from('gallery')
        .insert([{ title: imageTitle, image_url: publicUrl }])

      if (dbError) {
        showMessage('Gagal simpan ke database: ' + dbError.message, 'error')
      } else {
        showMessage('Berhasil upload gambar!', 'success')
        setImageFile(null)
        setImageTitle('')
        // Reset file input
        const fileInput = document.getElementById('imageInput') as HTMLInputElement
        if (fileInput) fileInput.value = ''
        loadGallery()
      }
    } catch (error: any) {
      showMessage('Error: ' + error.message, 'error')
    } finally {
      setUploading(false)
    }
  }

  const deleteImage = async (id: number, imageUrl: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus gambar ini?')) return

    try {
      const fileName = imageUrl.split('/').pop()

      if (fileName) {
        const { error: deleteError } = await supabase.storage
          .from('gallery-images')
          .remove([fileName])

        if (deleteError) {
          showMessage('Gagal menghapus file: ' + deleteError.message, 'error')
          return
        }
      }

      const { error: dbError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id)

      if (dbError) {
        showMessage('Gagal menghapus dari database: ' + dbError.message, 'error')
      } else {
        showMessage('Gambar berhasil dihapus!', 'success')
        loadGallery()
      }
    } catch (error: any) {
      showMessage('Error: ' + error.message, 'error')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) {
    return <div className="admin-container"><p className="loading">Loading...</p></div>
  }

  return (
    <div className="admin-container">
      <div className="header">
        <h1>Admin Dashboard - Upload Galeri</h1>
        <div className="header-buttons">
          <Link to="/">
            <button className="home-btn">← Kembali ke Beranda</button>
          </Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type} show`}>
          {message.text}
        </div>
      )}

      <div className="upload-section">
        <h2>Upload Gambar Baru</h2>
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label htmlFor="imageInput">Pilih Gambar:</label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageTitle">Judul Gambar:</label>
            <input
              type="text"
              id="imageTitle"
              placeholder="Masukkan judul gambar"
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="upload-btn" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload ke Galeri'}
          </button>
        </form>
      </div>

      <div className="gallery-section">
        <h2>Galeri Gambar</h2>
        {gallery.length === 0 ? (
          <p className="loading">Belum ada gambar di galeri</p>
        ) : (
          <div className="gallery-grid">
            {gallery.map((item) => (
              <div key={item.id} className="gallery-item">
                <img src={item.image_url} alt={item.title} />
                <div className="gallery-item-info">
                  <p className="gallery-item-title">{item.title}</p>
                  <button
                    className="delete-btn"
                    onClick={() => deleteImage(item.id, item.image_url)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
