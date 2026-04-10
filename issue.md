# Fitur Autentikasi: Halaman Login & Sesi Akses

## Deskripsi Singkat
Tujuan dari issue ini adalah untuk mengimplementasikan fungsionalitas antarmuka aplikasi untuk login pengguna. Prosedur ini melibatkan pembuatan form login yang aman, validasi struktur data, integrasi ke API autentikasi, serta pengaturan sesi melalui instruksi penyimpanan cookie secara *HTTP-only*.

## Task Checklist (Garis Besar)

### 1. Pembuatan Halaman Form Login (shadcn-svelte)
- [ ] Buat *route* atau halaman login khusus (misalnya `src/routes/login/+page.svelte`).
- [ ] Rancang UI form login menggunakan komponen siap pakai dari *shadcn-svelte* (seperti `Input`, `Label`, dan `Button`).
- Form harus memiliki kolom untuk pengisian NIK dan kata sandi (Password).

### 2. Validasi Data Form dengan Zod
- [ ] Install library `zod` ke dalam proyek.
- [ ] Deklarasikan skema validasi untuk pengisian login pada file skema yang relevan (misalnya di dalam direktori `entities/`). 
- [ ] Terapkan validasi secara internal sebelum *request* dikirimkan.

### 3. Logika Proses Login & API Request
- [ ] Hubungkan form ke proses eksekusi login yang merakit *payload* sesuai ketentuan:
  ```json
  {
      "username": "<nik_pengguna>",
      "password": "<kata_sandi>"
  }
  ```
- [ ] Kelola respons API: **Jika login gagal**, sajikan/munculkan pesan error (error message) kepada pengguna (misalnya melalui teks merah di form atau sebuah *toast/alert*).

### 4. Penanganan Sesi Pengguna & Redirect
Langkah berikut dijalankan secara spesifik ketika login dikonfirmasi **berhasil**:
- [ ] Simpan kredensial `access_token` dan `refresh_token` yang diserahkan API menuju SvelteKit's **HTTP Only Cookie** (agar terhindar dari pendedahan sisi *client*/XSS). Anda mungkin perlu melakukannya melalui *Server Actions* atau *Server Hooks*.
- [ ] Trigger *API Request* berikutnya ke rute API (mis. `/validate`) untuk mengambil informasi identitas dan peran (data user) yang telah diautentikasi.
- [ ] Tangkap dan lepaskan hasil *role* user ke dalam sebuah *Svelte store* (sebagai state global sementara yang mudah diakses UI).
- [ ] Alihkan (*redirect*) pengguna yang berhasil login ke halaman navigasi utama / halaman **Dashboard**.

## Catatan Tambahan (Bagi Developer / AI Model)
- Cukup penuhi alur dan arsitektur logis secara *direct* di fase ini.
- Disarankan menggunakan Server-side Actions (`+page.server.ts`) pada SvelteKit agar dapat menyetel secara utuh atribut `httpOnly: true` di kuki Anda tanpa bocor ke sisi peramban pengguna.
