import React, { useEffect } from "react";

function MapComponent({ locations }) {
  useEffect(() => {
    // 지도 로딩 시나리오 함수 정의
    if (!window.loadMapScenario) {
      window.loadMapScenario = function () {
        var map = new window.Microsoft.Maps.Map(
          document.getElementById("myMap"),
          {
            credentials:
              "ArT-C0vh0XjKS-ED1MLpcfBoxza_5KOS1256vRj6eZd30BYVp9dGbpGgvJYI5nGX",
            center: new window.Microsoft.Maps.Location(47.6062, -122.3321),
            zoom: 10,
          }
        );

        // locations.forEach((location) => {
        //   var loc = new window.Microsoft.Maps.Location(
        //     location.latitude,
        //     location.longitude
        //   );
        //   var pin = new window.Microsoft.Maps.Pushpin(loc);
        //   map.entities.push(pin);
        // });

        // 지도 클릭 이벤트 리스너 추가
        window.Microsoft.Maps.Events.addHandler(map, "click", function (e) {
          var point = new window.Microsoft.Maps.Point(e.getX(), e.getY());
          var loc = e.target.tryPixelToLocation(point);
          var pin = new window.Microsoft.Maps.Pushpin(loc);
          map.entities.push(pin);
          alert(`latitude: ${loc.latitude}, longitude: ${loc.longitude}`);
        });
      };
    }

    if (
      !document.querySelector('script[src*="bing.com/api/maps/mapcontrol"]')
    ) {
      const script = document.createElement("script");
      script.src = `https://www.bing.com/api/maps/mapcontrol?callback=loadMapScenario&key=ArT-C0vh0XjKS-ED1MLpcfBoxza_5KOS1256vRj6eZd30BYVp9dGbpGgvJYI5nGX&mkt=en-US`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      id="myMap"
      style={{ position: "relative", width: "800px", height: "600px" }}
    ></div>
  );
}

export default MapComponent;
