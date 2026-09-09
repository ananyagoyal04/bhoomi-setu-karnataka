// Bhoomi Setu — Enterprise GIS Spatial Mapping Engine
// Features: Satellite Imagery, Cadastral Polygons, Measurement Tools, Parcel Search & Metro Corridors
(function () {
  class BhoomiMapEngine {
    constructor() {
      this.activeMap = null;
      this.currentScreenId = null;
      this.currentLayerType = 'streets';
      this.measureMode = null; // 'distance' or 'area'
      this.measurePoints = [];
      this.measureLayer = null;
    }

    initMapForScreen(screenId) {
      this.currentScreenId = screenId;
      setTimeout(() => this.mountMap(screenId), 150);
    }

    mountMap(screenId) {
      if (typeof L === 'undefined') {
        console.warn('Leaflet not loaded yet.');
        return;
      }

      // Find map canvas container in the screen
      let mapContainer = document.querySelector('#gis-map-canvas, #map-canvas, [class*="leaflet-map-target"]');
      
      if (!mapContainer) {
        // Look for image placeholder or map box to replace
        const placeholder = document.querySelector('img[src*="map"], div[class*="h-"][class*="w-full"]:has(svg), main div[class*="relative"][class*="rounded"]:has(img)');
        if (placeholder && (screenId.includes('map') || screenId.includes('hazard') || screenId.includes('corridor') || screenId.includes('search'))) {
          placeholder.parentElement.style.position = 'relative';
          let newContainer = document.getElementById('bhoomi-leaflet-container');
          if (!newContainer) {
            newContainer = document.createElement('div');
            newContainer.id = 'bhoomi-leaflet-container';
            newContainer.className = 'w-full h-[520px] lg:h-[620px] rounded-xl overflow-hidden border border-outline-variant shadow-inner z-0 relative';
            placeholder.replaceWith(newContainer);
          }
          mapContainer = newContainer;
        }
      }

      if (!mapContainer) return;

      // Destroy previous map instance
      if (this.activeMap) {
        this.activeMap.remove();
        this.activeMap = null;
      }

      // Default center: Bengaluru ORR / Bellandur (12.9279, 77.6771)
      let center = [12.9279, 77.6771];
      let zoom = 14;

      if (screenId === 'climate-flood-hazard') {
        center = [12.9340, 77.6720]; // Near Bellandur lake & Raja Kaluve
        zoom = 14;
      } else if (screenId === 'interactive-acquisition-map') {
        center = [12.9350, 77.6800];
        zoom = 13;
      } else if (screenId === 'my-land-map') {
        center = [12.9279, 77.6771];
        zoom = 16;
      }

      const map = L.map(mapContainer, {
        zoomControl: false,
        scrollWheelZoom: true
      }).setView(center, zoom);

      this.activeMap = map;

      // Zoom control in top-left
      L.control.zoom({ position: 'topleft' }).addTo(map);

      // Define Base Tile Layers
      const streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO | Karnataka K-GIS Bhoomi',
        maxZoom: 19
      });

      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics | Karnataka Revenue Dept',
        maxZoom: 19
      });

      // Add default street layer
      streetLayer.addTo(map);

      // Add Base Layer Switcher Control
      const baseMaps = {
        "🗺️ Cadastral / Streets": streetLayer,
        "🛰️ Satellite Imagery (High Res)": satelliteLayer
      };

      L.control.layers(baseMaps, null, { position: 'topright', collapsed: false }).addTo(map);

      // Add Layers based on screen
      this.addCadastralLayers(map, screenId);
      this.addMetroCorridorLayer(map);
      
      if (screenId === 'climate-flood-hazard') {
        this.addFloodHazardOverlay(map);
      }

      // Add Custom GIS Map Toolbar (Search Parcel, Measure, Print)
      this.addGISToolbar(map);

      // Ensure proper tile sizing
      setTimeout(() => map.invalidateSize(), 200);
    }

    addGISToolbar(map) {
      const toolbarControl = L.control({ position: 'topleft' });
      toolbarControl.onAdd = () => {
        const div = L.DomUtil.create('div', 'bg-surface-container-lowest/95 backdrop-blur-md p-2 rounded-xl shadow-xl border border-outline-variant flex flex-col gap-2 mt-2 select-none text-xs');
        div.innerHTML = `
          <div class="flex items-center gap-1.5 border-b border-outline-variant/60 pb-1.5">
            <span class="material-symbols-outlined text-primary text-[18px]">travel_explore</span>
            <input type="text" id="map-parcel-search-input" placeholder="Search Sy No (e.g. 48/2A)" class="px-2 py-1 bg-surface-container border border-outline-variant rounded text-xs w-36 focus:outline-none focus:border-primary" />
            <button type="button" class="p-1 bg-primary text-white rounded hover:bg-primary-container" title="Search Cadastral Parcel" onclick="window.BhoomiMapEngine.searchParcelOnMap()">
              <span class="material-symbols-outlined text-[14px]">search</span>
            </button>
          </div>

          <div class="flex items-center justify-between gap-1 pt-0.5">
            <button type="button" class="px-2 py-1 bg-surface-container hover:bg-surface-container-high rounded text-[11px] font-bold text-on-surface flex items-center gap-1" title="Measure Line Distance" onclick="window.BhoomiMapEngine.toggleMeasure('distance')">
              <span class="material-symbols-outlined text-[14px] text-primary">straighten</span> Distance
            </button>
            <button type="button" class="px-2 py-1 bg-surface-container hover:bg-surface-container-high rounded text-[11px] font-bold text-on-surface flex items-center gap-1" title="Measure Parcel Area" onclick="window.BhoomiMapEngine.toggleMeasure('area')">
              <span class="material-symbols-outlined text-[14px] text-secondary">square_foot</span> Area
            </button>
            <button type="button" class="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" title="Reset Map Extents" onclick="window.BhoomiMapEngine.resetMapView()">
              <span class="material-symbols-outlined text-[16px]">refresh</span>
            </button>
          </div>
        `;

        L.DomEvent.disableClickPropagation(div);
        return div;
      };
      toolbarControl.addTo(map);
    }

    searchParcelOnMap() {
      const input = document.getElementById('map-parcel-search-input');
      if (!input || !this.activeMap) return;
      const query = input.value.trim().toLowerCase();

      const parcels = window.BHOOMI_DATA ? window.BHOOMI_DATA.parcels : [];
      const match = parcels.find(p => p.surveyNo.toLowerCase().includes(query) || p.village.toLowerCase().includes(query));

      if (match && match.coordinates) {
        this.activeMap.flyTo(match.coordinates, 17, { duration: 1.2 });
        if (window.BhoomiInteractions) {
          window.BhoomiInteractions.showToast(`Located Survey No. ${match.surveyNo} (${match.village}) • ${match.extentAcres}`, 'success', 'Cadastral GIS Match');
        }
      } else {
        if (window.BhoomiInteractions) {
          window.BhoomiInteractions.showToast(`No parcel found matching "${query}". Showing default Bellandur Survey 48 Series.`, 'warning', 'Search Result');
        }
      }
    }

    resetMapView() {
      if (!this.activeMap) return;
      this.activeMap.setView([12.9279, 77.6771], 14);
    }

    toggleMeasure(type) {
      if (this.measureMode === type) {
        this.measureMode = null;
        if (this.measureLayer) {
          this.activeMap.removeLayer(this.measureLayer);
          this.measureLayer = null;
        }
        if (window.BhoomiInteractions) {
          window.BhoomiInteractions.showToast('Measurement tool deactivated.', 'info', 'GIS Tool');
        }
        return;
      }

      this.measureMode = type;
      if (this.measureLayer) this.activeMap.removeLayer(this.measureLayer);

      if (type === 'distance') {
        // Draw sample distance vector (Bellandur station to Sy 48/2A boundary)
        const lineCoords = [[12.9265, 77.6770], [12.9279, 77.6771]];
        this.measureLayer = L.polyline(lineCoords, { color: '#005145', weight: 4, dashArray: '6, 6' }).addTo(this.activeMap);
        this.measureLayer.bindTooltip('<b>Direct Chainage Distance:</b> 162.4 meters', { permanent: true }).openTooltip();
        if (window.BhoomiInteractions) {
          window.BhoomiInteractions.showToast('Distance Tool Active: 162.4m from Bellandur Station Centerline to Sy 48/2A ROW.', 'info', 'GIS Distance');
        }
      } else if (type === 'area') {
        // Draw measured polygon for Sy 48/2A
        const polyCoords = [[12.9270, 77.6755], [12.9290, 77.6760], [12.9285, 77.6785], [12.9265, 77.6775]];
        this.measureLayer = L.polygon(polyCoords, { color: '#ba1a1a', fillColor: '#ffdad6', fillOpacity: 0.6, weight: 3 }).addTo(this.activeMap);
        this.measureLayer.bindTooltip('<b>Cadastral Computed Extent:</b> 1.45 Acres (5,868 m²)', { permanent: true }).openTooltip();
        if (window.BhoomiInteractions) {
          window.BhoomiInteractions.showToast('Area Measurement: 1.45 Acres (58 Guntas / 5,868 Sq Meters). Certified DGPS Survey.', 'info', 'GIS Extent');
        }
      }
    }

    addMetroCorridorLayer(map) {
      // Metro Phase 2A Alignment Route Polyline
      const metroRoute = [
        [12.9175, 77.6234], // Central Silk Board
        [12.9168, 77.6385], // HSR Layout
        [12.9242, 77.6620], // Agara
        [12.9265, 77.6770], // Bellandur / Sy 48
        [12.9320, 77.6890], // Kadubeesanahalli
        [12.9460, 77.6980], // Marathahalli
        [12.9650, 77.7010], // ISRO / Outer Ring Road
        [12.9860, 77.6800], // DRDO Sports Complex
        [13.0000, 77.6750]  // KR Puram Terminal
      ];

      const metroLine = L.polyline(metroRoute, {
        color: '#005145',
        weight: 6,
        opacity: 0.95,
        dashArray: '8, 6'
      }).addTo(map);

      metroLine.bindTooltip('<b>Bengaluru Metro Phase 2A (ORR Line)</b><br>18.2 km Elevated Viaduct Corridor', { sticky: true });

      // Station Nodes
      const stations = [
        { name: "Silk Board Interchange", coords: [12.9175, 77.6234], status: "Pier Construction (82% Complete)" },
        { name: "HSR Layout Station", coords: [12.9168, 77.6385], status: "Concourse Slab Cast" },
        { name: "Agara Station", coords: [12.9242, 77.6620], status: "Pier Cap Erection" },
        { name: "Bellandur Station", coords: [12.9265, 77.6770], status: "Land Acquired (Sec 19 Declared)" },
        { name: "Kadubeesanahalli Station", coords: [12.9320, 77.6890], status: "BESCOM Utility Shifting" },
        { name: "Marathahalli Station", coords: [12.9460, 77.6980], status: "Viaduct Span Erected" },
        { name: "KR Puram Terminal", coords: [13.0000, 77.6750], status: "Intermodal Station Hub" }
      ];

      stations.forEach(st => {
        const marker = L.circleMarker(st.coords, {
          radius: 7,
          fillColor: '#ffffff',
          color: '#005145',
          weight: 3,
          opacity: 1,
          fillOpacity: 1
        }).addTo(map);

        marker.bindPopup(`
          <div class="p-2.5 min-w-[210px] font-sans">
            <span class="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded">Namma Metro Corridor</span>
            <h4 class="font-bold text-sm text-on-surface mt-1.5">${st.name}</h4>
            <p class="text-xs text-on-surface-variant mt-0.5">Status: ${st.status}</p>
            <button class="mt-2 text-xs bg-primary text-white px-2.5 py-1 rounded font-bold w-full" onclick="window.BhoomiRouter.navigate('project-detail')">Inspect Project Dossier</button>
          </div>
        `);
      });
    }

    addCadastralLayers(map, screenId) {
      const parcels = window.BHOOMI_DATA ? window.BHOOMI_DATA.parcels : [];

      parcels.forEach(p => {
        if (p.polygon) {
          const isTarget = p.surveyNo === '48/2A';
          const poly = L.polygon(p.polygon, {
            color: isTarget ? '#ba1a1a' : '#005145',
            fillColor: isTarget ? '#ffdad6' : '#95f4de',
            fillOpacity: isTarget ? 0.65 : 0.45,
            weight: isTarget ? 3 : 2
          }).addTo(map);

          poly.bindTooltip(`<b>Survey No. ${p.surveyNo}</b> (${p.village})<br>${p.stage}`, { sticky: true });

          poly.bindPopup(`
            <div class="p-2.5 min-w-[230px] font-sans">
              <div class="flex items-center justify-between gap-2 border-b border-gray-200 pb-1">
                <span class="text-[10px] font-bold uppercase tracking-wider bg-secondary/15 text-secondary px-2 py-0.5 rounded">${p.village}</span>
                <span class="text-xs font-bold ${isTarget ? 'text-error' : 'text-primary'}">Sy. No. ${p.surveyNo}</span>
              </div>
              <h4 class="font-bold text-sm text-on-surface mt-1.5">${p.owner}</h4>
              <p class="text-xs text-on-surface-variant mt-0.5">Extent: <strong>${p.extentAcres}</strong></p>
              <p class="text-xs font-semibold text-primary mt-0.5">Statutory Award: <strong>${p.totalAward}</strong></p>
              <p class="text-[11px] text-gray-500 mt-0.5">Stage: ${p.stage}</p>
              <div class="mt-2.5 pt-2 border-t border-gray-200 flex gap-1.5">
                <button class="text-xs bg-primary text-white px-3 py-1 rounded font-bold w-full text-center" onclick="window.BhoomiRouter.navigate('parcel-detail')">View Parcel Dossier</button>
              </div>
            </div>
          `);
        }
      });
    }

    addFloodHazardOverlay(map) {
      // SWD Raja Kaluve Catchment & 30m Buffer Zone
      const bufferZone = [
        [12.9370, 77.6650],
        [12.9350, 77.6750],
        [12.9300, 77.6820],
        [12.9250, 77.6850],
        [12.9280, 77.6710],
        [12.9330, 77.6630]
      ];

      const hazardPoly = L.polygon(bufferZone, {
        color: '#b45309',
        fillColor: '#fde68a',
        fillOpacity: 0.45,
        dashArray: '5, 5',
        weight: 2
      }).addTo(map);

      hazardPoly.bindTooltip('<b>SWD Raja Kaluve 30m Buffer Zone</b><br>100-Year Inundation Sensitivity: Moderate', { sticky: true });

      // Add legend
      const legend = L.control({ position: 'topright' });
      legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'bg-white/95 p-3 rounded-lg shadow-md border border-gray-200 text-xs space-y-1.5');
        div.innerHTML = `
          <div class="font-bold text-gray-800 border-b pb-1">GIS Layer Legend</div>
          <div class="flex items-center gap-2"><span class="w-3 h-3 bg-red-400 border border-red-600 inline-block"></span> <span>Sy 48/2A (Sec 19 Declared)</span></div>
          <div class="flex items-center gap-2"><span class="w-3 h-3 bg-teal-400 border border-teal-600 inline-block"></span> <span>Public / Vacant Land</span></div>
          <div class="flex items-center gap-2"><span class="w-3 h-3 bg-amber-300 border border-amber-600 inline-block"></span> <span>Raja Kaluve Flood Buffer</span></div>
          <div class="flex items-center gap-2"><span class="w-4 h-1 bg-primary inline-block"></span> <span>Metro Phase 2A Alignment</span></div>
        `;
        return div;
      };
      legend.addTo(map);
    }
  }

  window.BhoomiMapEngine = new BhoomiMapEngine();
})();
