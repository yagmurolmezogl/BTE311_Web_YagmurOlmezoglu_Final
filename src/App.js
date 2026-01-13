import React, { useState } from 'react';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import './App.css'; 

function App() {
  // Arka plan durumunu tutan state
  const [bgClass, setBgClass] = useState('sunny');

  return (
    <div className={`App ${bgClass}`}>
      <div className="overlay"> {/* Yazıların okunması için karartma katmanı */}
        <Header />
        <div className="container" style={{minHeight: "75vh"}}>
          {/* setBackground fonksiyonunu Content'e gönderiyoruz */}
          <Content setBackground={setBgClass} /> 
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;