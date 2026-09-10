# Bhoomi Setu (ಭೂಮಿ ಸೇತು)
### Government of Karnataka | Land Acquisition & Statutory Revenue System (SIH Prototype)

An interactive, multi-role digital platform for the **Government of Karnataka (Revenue Department)** built for the Smart India Hackathon (SIH). It features 20 streamlined core screens mapping directly to 3 authoritative user flows (Landowner Citizen, SLAO Officer, Chief Secretary Executive Desk), Google Maps Satellite GIS mapping, and progressive backend API integration.

---

## 🌐 Live Demo vs. Full Local Multi-Backend Demo

### 1. 🚀 Live Web Demo (Vercel / Standalone)
- **Live URL**: [https://bhoomi-setu-karnataka-t53q.vercel.app](https://bhoomi-setu-karnataka-t53q.vercel.app)
- **Zero Configuration**: Click any of the 3 pre-fed Aadhaar login cards to immediately explore all 20 screens.
- **Vercel Serverless Functions**: Native `/api/health`, `/api/stats`, `/api/land/:surveyNo`, `/api/compensation/:surveyNo`, `/api/objection`, and `/api/parcels` execute as edge serverless functions.
- **Standalone Navigation**: Fully decoupled and synchronous navigation with client-side mock fallbacks ensuring zero blocked screens or 404s.

### 2. 💻 Full Local Multi-Backend Demo (Node + Python + PHP)
For evaluators and judges who want to inspect and test all 3 language services simultaneously:

```bash
# Terminal 1: Node.js Core Web & REST Server (Port 3000)
npm start

# Terminal 2: Python ML & Delay Prediction Microservice (Port 8000)
python backend.py

# Terminal 3: PHP Statutory Gazette & DSC Signing Gateway (Port 8080)
php -S localhost:8080 api.php
```

| Microservice | Port | Key Endpoints |
| :--- | :--- | :--- |
| **Node.js** | `3000` | `GET /api/health`, `GET /api/land/48-2A`, `GET /api/compensation/48-2A`, `POST /api/objection` |
| **Python** | `8000` | `GET /api/py/delay-prediction`, `POST /api/py/turnaround-simulation`, `GET /api/py/parcels` |
| **PHP** | `8080` | `POST /api.php?action=gazette-publish`, `POST /api.php?action=dsc-sign`, `GET /api/php/health` |

*(Note: The frontend automatically detects if it is running on `localhost`. When running locally, it communicates with the Python and PHP daemons on ports 8000 and 8080. When hosted remotely on Vercel, it uses silent local mock fallbacks so no connection timeouts or errors occur).*

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
├── api/                    # Vercel serverless edge functions
│   ├── health.js           # /api/health
│   ├── stats.js            # /api/stats
│   ├── objection.js        # /api/objection
│   ├── parcels.js          # /api/parcels
│   ├── land/               # /api/land/:surveyNo
│   └── compensation/       # /api/compensation/:surveyNo
├── bhoomi_db.json          # Dynamic JSON database for runtime records & objections
├── schema.sql              # Relational SQL schema for Karnataka Revenue database
├── vercel.json             # Edge routing configuration for Vercel deployment
└── tools/                  # Build, test, and verification utilities
    └── test_prototype.js   # Automated test suite (npm test)
```

---

## 🧪 Automated Testing

Run the automated test suite to verify route integrity, bundle consistency, and serverless endpoints:
```bash
npm test
```
All 31 test checks validate screens, runtime assets, serverless functions, and REST endpoints.
