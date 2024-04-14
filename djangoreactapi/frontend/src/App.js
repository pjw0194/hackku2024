import { useState, useEffect } from "react";

const App = () => {
  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/businesses").then((response) => {
      console.log(response.json());
    });
  }, []);
};

export default App;
