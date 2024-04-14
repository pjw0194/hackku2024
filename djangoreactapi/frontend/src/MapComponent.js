import React, { useEffect } from "react";

function MapComponent() {
  useEffect(() => {
    // 지도 로딩 시나리오 함수 정의
    if (!window.loadMapScenario) {
      window.loadMapScenario = function () {
        var map = new window.Microsoft.Maps.Map(
          document.getElementById("myMap"),
          {}
        );
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
      style={{ position: "relative", width: "1000px", height: "500px" }}
    ></div>
  );
}

export default MapComponent;
