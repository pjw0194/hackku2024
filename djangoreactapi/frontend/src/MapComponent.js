import React, { useEffect, useState } from "react";

function MapComponent({ locations }) {
  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    const loadMapScenario = () => {
      if (window.Microsoft && window.Microsoft.Maps) {
        var map = new window.Microsoft.Maps.Map(
          document.getElementById("myMap"),
          {}
        );

        window.Microsoft.Maps.Events.addHandler(map, "click", function (e) {
          var point = new window.Microsoft.Maps.Point(e.getX(), e.getY());
          var loc = e.target.tryPixelToLocation(point);
          var pin = new window.Microsoft.Maps.Pushpin(loc);
          map.entities.push(pin);
          const url = `http://localhost:8000/api/businesses?latitude=${loc.latitude}&longitude=${loc.longitude}`;
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data && data.businesses) {
                const extractCoordinates = data.businesses.map(
                  (business) => business.coordinates
                );
                setCoordinates(extractCoordinates);
              }
            })
            .catch((error) => console.error("Error:", error));
        });

        coordinates.forEach((location) => {
          var loc = new window.Microsoft.Maps.Location(
            location.latitude,
            location.longitude
          );
          var pin = new window.Microsoft.Maps.Pushpin(loc);
          map.entities.push(pin);
        });
      } else {
        console.error("Bing Maps API not loaded.");
      }
    };

    console.log(coordinates);

    if (
      !document.querySelector('script[src*="bing.com/api/maps/mapcontrol"]')
    ) {
      const script = document.createElement("script");
      script.src =
        "https://www.bing.com/api/maps/mapcontrol?callback=loadMapScenario&key=ArT-C0vh0XjKS-ED1MLpcfBoxza_5KOS1256vRj6eZd30BYVp9dGbpGgvJYI5nGX&mkt=en-US";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Ensure that the callback is attached to window object
      window.loadMapScenario = loadMapScenario;
      loadMapScenario(); // Call it directly if the script is already loaded
    }
  }, [coordinates]);

  return (
    <div
      id="myMap"
      style={{ position: "relative", width: "1000px", height: "500px" }}
    ></div>
  );
}

export default MapComponent;
