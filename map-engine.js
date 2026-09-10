// Bhoomi Setu — Google Maps JavaScript API & GIS Spatial Engine
// Government of Karnataka | Land Acquisition & Statutory Revenue System
(function () {
  const GOOGLE_MAPS_KEY_PLACEHOLDER = 'YOUR_GOOGLE_MAPS_API_KEY';

  class BhoomiMapEngine {
    constructor() {
      this.activeGoogleMap = null;
      this.activeLeafletMap = null;
      this.currentScreenId = null;
    }

    initMapForScreen(screenId) {
      this.currentScreenId = screenId;
      setTimeout(() => this.mountMap(screenId), 150);
    }

    mountMap(screenId) {
      // Find container
      let container = document.querySelector('#gis-map-canvas, #map-canvas, [class*="leaflet-map-target"], #bhoomi-map-container');
      
      if (!container) {
        const placeholder = document.querySelector('img[src*="map"], div[class*="h-"][class*="w-full"]:has(svg), main div[class*="relative"][class*="rounded"]:has(img)');
        if (placeholder && (screenId.includes('map') || screenId.includes('queue') || screenId.includes('detail') || screenId.includes('verification'))) {
          placeholder.parentElement.style.position = 'relative';
          let newContainer = document.getElementById('bhoomi-map-container');
          if (!newContainer) {
            newContainer = document.createElement('div');
            newContainer.id = 'bhoomi-map-container';
            newContainer.className = 'w-full h-[450px] lg:h-[550px] rounded-xl overflow-hidden border border-outline-variant shadow-inner z-0 relative';
            placeholder.replaceWith(newContainer);
          }
          container = newContainer;
        }
      }

      if (!container) return;

      // Check if Google Maps JS API is available
      if (typeof google !== 'undefined' && google.maps) {
        this.mountGoogleMap(container, screenId);
      } else if (typeof L !== 'undefined') {
        // Fallback to Leaflet with High-Res Satellite
        this.mountLeafletMap(container, screenId);
      }
    }

    mountGoogleMap(container, screenId) {
      const center = (screenId === 'climate-flood-hazard') ? { lat: 12.9340, lng: 77.6720 } : { lat: 12.9279, lng: 77.6771 };
      const zoom = (screenId === 'interactive-acquisition-map') ? 13 : 16;

      const map = new google.maps.Map(container, {
        center: center,
        zoom: zoom,
        mapTypeId: 'hybrid', // Satellite with road labels
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true
      });

      this.activeGoogleMap = map;

      // Survey 48/2A Cadastral Polygon (Bellandur)
      const plot48Coords = [
        { lat: 12.9270, lng: 77.6755 },
        { lat: 12.9290, lng: 77.6760 },
        { lat: 12.9285, lng: 77.6785 },
        { lat: 12.9265, lng: 77.6775 }
      ];

      const plotPolygon = new google.maps.Polygon({
        paths: plot48Coords,
        strokeColor: '#ba1a1a',
        strokeOpacity: 0.9,
        strokeWeight: 3,
        fillColor: '#ffdad6',
        fillOpacity: 0.55
      });
      plotPolygon.setMap(map);

      // Info Window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; font-family: sans-serif; font-size: 12px;">
            <strong style="color: #ba1a1a;">Survey No. 48/2A (Bellandur)</strong><br/>
            Owner: Sri. Rajesh Kumar<br/>
            Extent: 1.45 Acres (58 Guntas)<br/>
            Total Award: <strong>₹ 6,78,40,000</strong><br/>
            <button style="margin-top:6px; background:#005145; color:#fff; border:none; padding:4px 8px; border-radius:4px; font-weight:bold; cursor:pointer;" onclick="if(window.FramesEngine)window.FramesEngine.openCompensationFrame()">Inspect Solatium</button>
          </div>
        `
      });

      plotPolygon.addListener('click', (e) => {
        infoWindow.setPosition(e.latLng);
        infoWindow.open(map);
      });

      // Metro Route Polyline
      const metroPath = [
        { lat: 12.9175, lng: 77.6234 }, // Silk Board
        { lat: 12.9168, lng: 77.6385 }, // HSR
        { lat: 12.9242, lng: 77.6620 }, // Agara
        { lat: 12.9265, lng: 77.6770 }, // Bellandur
        { lat: 12.9320, lng: 77.6890 }, // Kadubeesanahalli
        { lat: 12.9460, lng: 77.6980 }, // Marathahalli
        { lat: 13.0000, lng: 77.6750 }  // KR Puram
      ];

      new google.maps.Polyline({
        path: metroPath,
        geodesic: true,
        strokeColor: '#005145',
        strokeOpacity: 1.0,
        strokeWeight: 5,
        map: map
      });

      // Metro Station Marker
      const bellandurMarker = new google.maps.Marker({
        position: { lat: 12.9265, lng: 77.6770 },
        map: map,
        title: 'Bellandur Metro Station (Phase 2A)'
      });

      bellandurMarker.addListener('click', () => {
        if (window.BhoomiInteractions) {
          window.BhoomiInteractions.showToast('Bellandur Metro Station Node: Section 19 Gazetted. 32/32 Parcels Acquired.', 'success', 'Metro Phase 2A');
        }
      });
    }

    mountLeafletMap(container, screenId) {
      if (this.activeLeafletMap) {
        this.activeLeafletMap.remove();
        this.activeLeafletMap = null;
      }

      const center = (screenId === 'climate-flood-hazard') ? [12.9340, 77.6720] : [12.9279, 77.6771];
      const zoom = (screenId === 'interactive-acquisition-map') ? 13 : 16;

      const map = L.map(container, { scrollWheelZoom: true }).setView(center, zoom);
      this.activeLeafletMap = map;

      // Google Satellite / ESRI High-Res Layer
      const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri, Maxar | Karnataka Revenue Dept GIS',
        maxZoom: 19
      });
      satellite.addTo(map);

      // Cadastral Polygon
      const poly = L.polygon([
        [12.9270, 77.6755],
        [12.9290, 77.6760],
        [12.9285, 77.6785],
        [12.9265, 77.6775]
      ], {
        color: '#ba1a1a',
        fillColor: '#ffdad6',
        fillOpacity: 0.6,
        weight: 3
      }).addTo(map);

      poly.bindPopup(`
        <div style="font-family:sans-serif; font-size:12px; min-width:180px;">
          <strong style="color:#ba1a1a;">Survey No. 48/2A (Bellandur)</strong><br/>
          Owner: Sri. Rajesh Kumar<br/>
          Extent: 1.45 Acres (58 Guntas)<br/>
          Award: <strong>₹ 6,78,40,000</strong><br/>
          <button style="margin-top:6px; background:#005145; color:#fff; border:none; padding:4px 8px; border-radius:4px; font-weight:bold; cursor:pointer; width:100%;" onclick="if(window.FramesEngine)window.FramesEngine.openCompensationFrame()">View Compensation Dossier</button>
        </div>
      `);

      // Metro Corridor Alignment
      L.polyline([
        [12.9175, 77.6234],
        [12.9168, 77.6385],
        [12.9242, 77.6620],
        [12.9265, 77.6770],
        [12.9320, 77.6890],
        [12.9460, 77.6980],
        [13.0000, 77.6750]
      ], { color: '#005145', weight: 5, dashArray: '6, 6' }).addTo(map);

      setTimeout(() => map.invalidateSize(), 200);
    }
  }

  window.BhoomiMapEngine = new BhoomiMapEngine();
})();
