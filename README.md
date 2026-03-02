Bu proje, modern bir e-ticaret uygulamasının temel özelliklerini (ürün listeleme, detay görme, sepet yönetimi, kullanıcı girişi vb.) içeren kapsamlı bir React / Next.js uygulamasıdır.

## 🚀 Teknolojik Yığın (Tech Stack)

*   **Framework:** [Next.js 16.1.6 (App Router)](https://nextjs.org/)
*   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **API Client:** [Axios](https://axios-http.com/)
*   **Testing:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Dosya Yapısı

Proje, sürdürülebilirlik ve ölçeklenebilirlik gözetilerek modüler bir yapıda tasarlanmıştır:

```text
├── __tests__             # Test dosyaları (Bileşen ve UI testleri)
│   ├── components        # Sayfa bazlı bileşen testleri
│   └── ui-components     # Atomik UI bileşen testleri (Button, Input vb.)
├── app                   # Next.js App Router kök dizini
│   ├── components        # Uygulama genelinde kullanılan bileşenler
│   │   ├── ui-components # Yeniden kullanılabilir komponentler
│   │   └── svg-components# SVG ikon bileşenleri
│   ├── constants         # Sabit değerler (Renkler, İçerik Metinleri)
│   ├── lib               # Yardımcı kütüphaneler ve yardımcı fonksiyonlar
│   ├── products          # Ürün yönetimi ile ilgili sayfalar (Dinamik rotalar)
│   ├── services          # API servisleri (Auth, Ürün, Sepet)
│   └── store             # Redux Store yapılandırması ve Slice'lar
├── public                # Statik varlıklar (İkonlar, Resimler)
├── package.json          # Bağımlılıklar ve script'ler
└── jest.config.js        # Test yapılandırması
```

---

## 🛠️ Kurulum ve Çalıştırma

### 1. Hazırlık
Öncelikle gerekli bağımlılıkları yükleyin:
```bash
npm install
```

### 2. Geliştirme Modu (Development)
Uygulamayı yerelde çalıştırmak için:
```bash
npm run dev
```
Uygulamaya tarayıcınızdan `http://localhost:3000` adresinden erişebilirsiniz.

### 3. Yayına Hazırlık (Production)
Uygulamayı derlemek ve optimize edilmiş sürümü çalıştırmak için:
```bash
npm run build
npm run start
```

---

## 🧪 Test Süreçleri

Projede **Unit** ve **Integration** testleri için Jest ve React Testing Library kullanılmaktadır.

*   **Tüm testleri çalıştırmak için:**
    ```bash
    npm run test
    ```
*   **İzleme modunda (Watch Mode) çalıştırmak için:**
    ```bash
    npm run test:watch
    ```

Testler `__tests__` dizini altında organize edilmiştir ve bileşenlerin render doğruluğu, kullanıcı etkileşimleri ve state değişimlerini doğrular.

---

*   **İçerik Yönetimi:** Uygulama içerisindeki tüm buton, başlık ve hata metinleri `app/constants/content.ts` dosyasındaki `CONTENT` objesi üzerinden yönetilir. Bu, ileride yapılacak i18n (dil desteği) çalışmalarını kolaylaştırır.
*   **Renk Paleti:** Marka renkleri `app/constants/colors.ts` dosyasında merkezi olarak tutulur.

---

## ✨ Önemli Özellikler

- **Responsive Tasarım:** Tüm cihazlarda uyumlu çalışan UI/UX bileşenleri.
- **Redux Persist:** Sayfa yenilense dahi sepet ve kullanıcı oturum bilgilerinin korunması.
- **Skeleton Loaders:** Veri yüklenirken kullanıcı deneyimini iyileştiren iskelet yükleyiciler.
- **Dinamik Rotalar:** `products/[id]` yapısı ile detaylı ürün yönetimi.
