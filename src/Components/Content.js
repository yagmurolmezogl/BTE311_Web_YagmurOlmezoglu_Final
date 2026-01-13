import React, { useState, useEffect } from 'react';

const Content = ({ setBackground }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Ankara");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleBackgroundChange = (code) => {
    // WMO Hava Kodları: 0=Açık, 1-3=Bulutlu, 51-67=Yağmur, 71-77=Kar
    if (code === 0 || code === 1) setBackground('sunny');
    else if (code >= 71 && code <= 77) setBackground('snowy');
    else if (code >= 51 && code <= 67) setBackground('rainy');
    else setBackground('cloudy');
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    setWeather(null); // Yeni arama yaparken eski veriyi temizle

    try {
      // 1. Adım: Şehir isminden koordinat bul
      // 'language=tr' parametresi Türkçe karakter uyumu için önemlidir
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=tr&format=json`);
      const geoData = await geoRes.json();

      // HATA KONTROLÜ 1: API hiç sonuç bulamadıysa
      if (!geoData.results) {
        throw new Error("Şehir bulunamadı! Lütfen geçerli bir isim girin.");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // HATA KONTROLÜ 2 (İstediğin Özellik): İsim Eşleşmesi Kontrolü
      // Kullanıcının girdiği ile gelen veriyi küçük harfe çevirip karşılaştırıyoruz.
      // toLocaleLowerCase('tr') Türkçe karakterleri (İ, ı, Ş, ş) düzgün çevirir.
      const girilen = cityName.toLocaleLowerCase('tr').trim();
      const gelen = name.toLocaleLowerCase('tr');

      // Eğer girilen kelime, gelen kelimenin aynısı değilse hata ver
      // (Örn: 'istanbuş' !== 'istanbul')
      if (girilen !== gelen) {
        throw new Error(`"${cityName}" bulunamadı. Bunu mu demek istediniz: "${name}"?`);
      }

      // 2. Adım: Koordinattan hava durumu çek
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherData = await weatherRes.json();

      setWeather({
        city: name,
        country: country,
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
        code: weatherData.current_weather.weathercode
      });

      handleBackgroundChange(weatherData.current_weather.weathercode);
      setLoading(false);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Ankara");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput) fetchWeather(searchInput);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        
        <form onSubmit={handleSearch} className="input-group mb-4 shadow-sm">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Şehir adı giriniz (Örn: Izmir)..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-warning" type="submit">Hava Durumu Gör</button>
          </div>
        </form>

        {loading && <div className="alert alert-info text-center">Veriler yükleniyor...</div>}
        
        {/* Hata Mesajı Alanı */}
        {error && (
          <div className="alert alert-danger text-center shadow-sm">
            ❌ <strong>Hata:</strong> {error}
          </div>
        )}

        {weather && !loading && !error && (
          <div className="card text-center text-white shadow-lg border-0 fade-in" style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)'}}>
            <div className="card-body">
              <h2 className="card-title display-4">{weather.city}, {weather.country}</h2>
              <hr className="bg-white" />
              <h1 className="display-1 fw-bold">{weather.temp}°C</h1>
              <p className="card-text lead">Rüzgar Hızı: {weather.wind} km/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;