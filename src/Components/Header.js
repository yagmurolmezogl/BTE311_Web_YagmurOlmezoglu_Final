import React from 'react';

const Header = () => {
  return (
    <header className="text-white p-4 text-center mb-4" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <h1 className="display-4">🌦️ Hava Durumu</h1>
      <p className="lead">React & Open-Meteo API Final Ödevi</p>
      <a href="https://github.com/yagmurolmezogl/BTE311_Web_YagmurOlmezoglu_Final" className="btn btn-outline-light">GitHub Repo</a>
    </header>
  );
};

export default Header;