# Bhoomi Setu (ಭೂಮಿ ಸೇತು)
### Government of Karnataka | Land Acquisition & Statutory Revenue System (SIH Prototype)

An interactive, multi-role digital platform for the **Government of Karnataka (Revenue Department)** built for the Smart India Hackathon (SIH). It features 20 streamlined core screens mapping directly to 3 authoritative user flows (Landowner Citizen, SLAO Officer, Chief Secretary Executive Desk), multi-backend integration (Node.js, Python, PHP), and Google Maps Satellite GIS mapping.

---

## 🚀 Starting the Prototype Backends

The platform operates as a multi-tier prototype with 3 independent microservices:

### 1. 🟢 Node.js Core Web & REST Server (Port 3000)
Serves the responsive single-page portal, static assets, and REST API endpoints (`/api/land/:surveyNo`, `/api/compensation/:surveyNo`, `/api/objection`).
```bash
npm start
# or: node server.js
```
- **Web App**: [http://localhost:3000](http://localhost:3000)
- **Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health)
- **Parcel API**: [http://localhost:3000/api/land/48-2A](http://localhost:3000/api/land/48-2A)
- **Compensation API**: [http://localhost:3000/api/compensation/48-2A](http://localhost:3000/api/compensation/48-2A)

### 2. 🐍 Python ML & Delay Prediction Microservice (Port 8000)
Provides machine learning delay risk predictions and AI turnaround simulations for the Executive Command Desk.
```bash
python backend.py
```
- **Service Root**: [http://localhost:8000/api/py/health](http://localhost:8000/api/py/health)
- **ML Delay Prediction**: `GET http://localhost:8000/api/py/delay-prediction`
- **AI Turnaround Simulation**: `POST http://localhost:8000/api/py/turnaround-simulation`

### 3. 🐘 PHP Statutory Gazette & DSC Signing Gateway (Port 8080)
Handles statutory Section 19(1) Gazette generation and Class-3 DSC digital certificate sealing.
```bash
php -S localhost:8080 api.php
```
- **Service Root**: [http://localhost:8080/api/php/health](http://localhost:8080/api/php/health)
- **Gazette Publishing Action**: `POST http://localhost:8080/api.php?action=gazette-publish`
- **DSC Token Signing Action**: `POST http://localhost:8080/api.php?action=dsc-sign`

---

## 🗺️ Google Maps JavaScript API Configuration

The GIS engine in `map-engine.js` is built on the **Google Maps JavaScript API** with satellite/hybrid cadastral overlays and automatic fallback to Leaflet if an API key is not supplied.

1. Obtain an API key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview).
2. Enable the **Maps JavaScript API**.
3. (Recommended) Restrict the API key to `HTTP referrers` (e.g., `localhost:*`, `*.vercel.app/*`, `*.github.io/*`).
4. Replace `YOUR_GOOGLE_MAPS_API_KEY` in `index.html` (line 300) and `map-engine.js`:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=geometry,drawing" async defer></script>
```
*Note: If no API key is provided, the application automatically uses Leaflet with ESRI World Imagery high-resolution satellite tiles.*

---

## 👥 3 Core User Flows (20 Core Screens)

| Role | Pre-fed Aadhaar | Flow Walkthrough |
| :--- | :--- | :--- |
| **👨‍🌾 Citizen (Landowner)** | `5489-1204-4819` | Land Record Dossier (Sy 48/2A) ➔ ₹6.78 Cr Compensation & Solatium Breakdown ➔ Interactive Satellite Cadastral Map ➔ Section 15(1) Objection Filing |
| **👔 SLAO Officer** | `8921-4421-0894` | Scanned Form 9 Deed Split-View ➔ Class-3 DSC Digital Seal ➔ Multi-Tier Statutory Approval Pipeline ➔ Section 19(1) Gazette Publishing |
| **🏢 Chief Secretary** | `1102-9934-0001` | Statewide Corridor Tracker (Metro 2A) ➔ ML Delay Risk Analytics ➔ AI Turnaround Matrix (-45 Days Saved) ➔ Statewide GIS Telemetry |

---

## 📂 Streamlined Architecture

```
bhoomi-setu-karnataka/
├── index.html              # Pre-rendered SPA entry with 3-role gateway
├── app-bundle.js           # Consolidated client runtime (Router, State, Modals, Telemetry)
├── data-store.js           # Master Bhoomi data & Aadhaar demo profiles
├── map-engine.js           # Google Maps JS API + Leaflet Satellite GIS engine
├── screens-data.js         # 20 curated core screens with zero dead ends
├── server.js               # Node.js REST API & static server (Port 3000)
├── backend.py              # Python ML delay prediction service (Port 8000)
├── api.php                 # PHP Gazette publishing & DSC service (Port 8080)
├── bhoomi_db.json          # Dynamic JSON database for runtime records & objections
├── schema.sql              # Relational SQL schema for Karnataka Revenue database
├── vercel.json             # Edge routing configuration for Vercel deployment
└── tools/                  # Build, test, and verification utilities
    └── test_prototype.js   # Automated test suite (npm test)
```

---

## 🧪 Automated Testing

Run the automated test suite to verify route integrity, bundle consistency, and server endpoints:
```bash
npm test
```
All 20 test checks validate screens, runtime assets, and REST endpoints.
