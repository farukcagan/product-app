# Octopus Case Study - E-Commerce Application

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş, yüksek performanslı ve kullanıcı dostu bir e-ticaret uygulamasıdır. DummyJSON API kullanılarak ürün listeleme, filtreleme, arama ve ürün detayı özellikleri sunmaktadır.

## 🚀 Özellikler

- **Modern Kimlik Doğrulama**: DummyJSON auth servisi ile güvenli giriş yapısı.
- **Dinamik Ürün Listeleme**: Kategori bazlı filtreleme ve anlık arama desteği.
- **Gelişmiş Filtreleme**: Kenar çubuğu üzerinden kolay kategori seçimi ve metin tabanlı arama.
- **Ürün Detay Sayfası**: Çoklu görsel desteği, dinamik yorum listeleme ve sepete ekleme özellikleri.
- **Durum Yönetimi**: Redux Toolkit ile merkezi state yönetimi ve Redux Persist ile kalıcı veri saklama.
- **Premium UI/UX**: 
  - Tailwind CSS 4 ile modern tasarım dili.
  - Özel Skeleton loading yapısı ile akıcı kullanıcı deneyimi.
  - Responsive tasarım (Mobil, Tablet, Masaüstü uyumlu).
  - İnteraktif mikro-animasyonlar.

## 🛠️ Teknoloji Yığını

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Persistence**: [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Icons & Graphics**: Heroicons, Lucide, Custom SVG

## 📁 Proje Yapısı

```text
app/
├── components/      # Reusable UI bileşenleri (Header, Sidebar, vb.)
├── constants/       # Sabit metinler ve konfigürasyonlar
├── lib/             # API yapılandırması ve utils
├── services/        # API istek servisleri
└── store/           # Redux store ve slice yapıları
    ├── slices/      # Bağımsız state mantıkları
    └── hooks.ts     # Typed Redux hooks
```

## 🏁 Başlarken

### Gereksinimler

- Node.js 18.x veya üzeri
- npm / yarn / pnpm

### Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/user/octopus-case.git
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

4. Tarayıcınızda `http://localhost:3000` adresini açın.

## 📝 Notlar

- Uygulama başlangıçta `/` route'unda bir giriş formu sunar. DummyJSON kullanıcı bilgileriyle (örn: `emilys`, `emilyspass`) giriş yapabilirsiniz.
- Giriş yapmadan `/products` sayfasına erişim middleware/client-side kontrolü ile engellenmiştir.
