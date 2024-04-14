import { useState, useEffect } from "react";
import "./App.css";
import MapComponent from "./MapComponent";

const App = () => {
  const [businesses, setBusinesses] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/businesses")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.businesses) {
          const extractCoordinates = data.businesses.map(
            (business) => business.coordinates
          );
          setCoordinates(extractCoordinates);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);
  // return <div></div>;
  return (
    <div className="App">
      {/* 상단 메뉴 추가 */}
      <div className="top-menu">
        <a href="/about" className="menu-item">
          About
        </a>
        <a href="/contact" className="menu-item">
          Contact
        </a>
      </div>

      {/* 로그인/회원가입 버튼 추가 */}
      <div className="auth-buttons">
        <a href="/signup" className="auth-button">
          Sign Up
        </a>
        <a href="/signin" className="auth-button">
          Sign In
        </a>
      </div>

      <header className="App-header">
        <div className="main-title">JIMAP</div>
        <div className="subtitle">"Discover Your World"</div>
        <div className="advertisement">
          Explore the best eats, attractions, and stays near you with just one
          click!
          <br />
          Dive into local gems and make every journey unforgettable.
          <br />
          Start exploring now!
        </div>
        <MapComponent locations={coordinates} />
      </header>
    </div>
  );
};

export default App;
