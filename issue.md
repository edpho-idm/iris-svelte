# Setup Infrastructure: Error Handling, DI, dan HTTP Client

## Deskripsi Singkat
Tahap ini mencakup pembuatan fondasi *infrastructure* dasar untuk menunjang kebutuhan aplikasi. Komponen utama yang akan dibuat adalah standarisasi Error Handling, konfigurasi Dependency Injection (DI) menggunakan library `ioctopus`, serta pembuatan *HTTP Client wrapper*.

## Task Checklist (Garis Besar)

### 1. Base Error Class
- [ ] Buat *abstract class* bernama `AppError`. Class ini akan digunakan sebagai *base class* (induk) dari semua error spesifik pada *project* ini.

### 2. Custom Error Classes
- [ ] Buat *error class* turunan dari `AppError` untuk menangani jenis error yang umum terjadi, antara lain:
  - `BadRequestError`
  - `UnauthorizedError`
  - `NotFoundError`
  - `InternalServerError`
  - `ForbiddenError`
  - `ValidationError`
  - `DataNotFoundError`
  - `UnknownError`

### 3. Error Mapper
- [ ] Buat *mapper class* atau utility function yang bertugas memetakan (mapping) setiap unhandled error atau HTTP response error menjadi salah satu tipe `AppError` yang sesuai. Hal ini memastikan pola *return error* kita tetap terstandarisasi.

### 4. Dependency Injection (DI)
- [ ] Tambahkan library `ioctopus` ke dalam project (menggunakan bun).
- [ ] Lakukan setup *container* utama untuk konfigurasi DI, yang nantinya menjadi pusat untuk mendaftarkan (*register*) kelas layer Service, Repository, maupun Infrastructure.

### 5. HTTP Client
- [ ] Buat class `HttpClient` khusus yang akan bertindak sebagai pengatur (*wrapper*) utama ketika aplikasi melakukan request API ke backend.
- [ ] Terapkan integrasi dengan *Error Mapper* di dalam *class* ini sehingga error API dapat ditransformasikan langsung menjadi `AppError`.

## Catatan Eksekusi untuk Developer / AI
- Jangan buat detail implementasinya terlalu spesifik jika dirasa memakan waktu. Cukup sediakan pondasi kode yang kokoh untuk masing-masing poin di atas.
- Manfaatkan folder `src/lib/infrastructure/` untuk fungsi DI, HttpClient, AppError, ErrorMapper, dan Error Classes.
