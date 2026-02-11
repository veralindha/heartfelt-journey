
## Tambahkan Foto ke Galeri Kenangan

### Langkah-langkah:

1. **Salin foto** dari `user-uploads://r1.jpeg` ke `src/assets/gallery-1.jpeg`

2. **Update `GallerySection.tsx`**:
   - Import gambar: `import galleryPhoto from "@/assets/gallery-1.jpeg"`
   - Ganti placeholder (emoji dan ikon) dengan tag `<img>` yang menampilkan foto asli
   - Tambahkan styling `object-cover` agar foto mengisi frame dengan rapi

### Hasil Akhir
Foto yang kamu upload akan tampil di section Galeri Kenangan menggantikan placeholder yang ada sekarang.
