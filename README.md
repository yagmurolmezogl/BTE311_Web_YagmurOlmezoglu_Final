# React Hava Durumu Uygulaması

Bu proje, React kullanılarak geliştirilmiş bir hava durumu uygulamasıdır. Kullanıcıdan şehir bilgisi alarak Open-Meteo API'si üzerinden hava durumu verilerini çeker ve dinamik bir şekilde kullanıcıya sunar.

## Kullanılan Teknolojiler
- React
- Open-Meteo API
- CSS

## Özellikler
- Kullanıcıdan şehir bilgisi alarak hava durumu verilerini listeleme.
- Hava durumuna göre dinamik arka plan değişimi (örneğin: güneşli, yağmurlu, karlı).
- Yükleniyor ve hata mesajları ile kullanıcı deneyimini artırma.
- API'den gelen verilerin doğruluğunu kontrol etme ve kullanıcıya öneriler sunma.

## Kurulum ve Çalıştırma
1. Projeyi klonlayın:
   ```bash
   git clone <proje-linki>
   ```
2. Proje dizinine gidin:
   ```bash
   cd final-odevi
   ```
3. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
4. Uygulamayı başlatın:
   ```bash
   npm start
   ```
5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı görüntüleyin.

## Kullanılan API
- Open-Meteo API: [https://open-meteo.com](https://open-meteo.com)

## Ekran Görüntüsü
Uygulamanın ekran görüntüsü:

![Ekran Görüntüsü](public/screenshot.png)

## Proje Yapısı
- `src/Components/Header.js`: Sayfanın başlığı ve açıklaması.
- `src/Components/Content.js`: API'den gelen verilerin listelendiği bölüm.
- `src/Components/Footer.js`: Telif ve iletişim bilgileri.

## Katkıda Bulunma
Katkıda bulunmak için lütfen bir pull request gönderin.

