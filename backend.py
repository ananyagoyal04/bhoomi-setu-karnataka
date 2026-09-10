"""
Bhoomi Setu — Python Microservice (FastAPI / Standard HTTP)
Government of Karnataka | Land Acquisition & Statutory Delay Prediction Service
Port: 8000
"""

import sys
import json
import sqlite3
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

PORT = 8000
DB_FILE = "bhoomi_database.sqlite"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS parcels (
            id TEXT PRIMARY KEY,
            survey_no TEXT,
            khata_no TEXT,
            village TEXT,
            owner TEXT,
            extent TEXT,
            total_award TEXT,
            status TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS gazette_notices (
            id TEXT PRIMARY KEY,
            notification_no TEXT,
            title TEXT,
            section TEXT,
            area TEXT,
            status TEXT
        )
    """)
    # Seed sample records if empty
    cursor.execute("SELECT COUNT(*) FROM parcels")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO parcels VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            ("48-2A", "48/2A", "1842/48", "Bellandur", "Rajesh Kumar S/o Late S. Muniyappa", "1.45 Acres", "₹ 6,78,40,000", "SEC_19_DECLARED"))
        cursor.execute("INSERT INTO parcels VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            ("56-2", "56/2", "GOVT-56", "Chikkabanavara", "Government of Karnataka", "3.20 Acres", "₹ 0 (Public Gomal)", "GOVT_AVAILABLE"))
        cursor.execute("INSERT INTO gazette_notices VALUES (?, ?, ?, ?, ?, ?)",
            ("RD-LAQ-SH17", "RD-LAQ-SH17-2025-09", "SH-17 Expressway Hubballi Bypass", "SECTION 19(1)", "148.60 Acres", "Ready to Stamp"))
        cursor.execute("INSERT INTO gazette_notices VALUES (?, ?, ?, ?, ?, ?)",
            ("RD-LAQ-METRO3", "RD-LAQ-METRO3-2025-03", "Namma Metro Phase 3 Magadi Road Depot", "SECTION 19(1)", "180.00 Acres", "Statutory Expiry Risk"))
        conn.commit()
    conn.close()

class BhoomiPythonHandler(BaseHTTPRequestHandler):
    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/py/health":
            self._send_json({
                "status": "ONLINE",
                "service": "Bhoomi Python ML & Analytics Microservice",
                "runtime": f"Python {sys.version.split()[0]}",
                "port": PORT,
                "endpoints": [
                    "GET /api/py/health",
                    "GET /api/py/delay-prediction",
                    "POST /api/py/turnaround-simulation",
                    "GET /api/py/parcels",
                    "GET /api/py/gazette"
                ]
            })
        elif path == "/api/py/delay-prediction":
            prediction = {
                "corridor": "Namma Metro Phase 2A (Silk Board to KR Puram)",
                "totalParcels": 312,
                "acquiredParcels": 264,
                "pendingParcels": 48,
                "predictedDelayDays": 38,
                "riskLevel": "MODERATE",
                "confidenceScore": 0.942,
                "bottlenecks": [
                    {"category": "High Court Writs", "impactPercent": 42, "criticalParcels": 6},
                    {"category": "BESCOM 66kV Utility Shifting", "impactPercent": 31, "criticalParcels": 4},
                    {"category": "Section 15(1) Valuations", "impactPercent": 18, "criticalParcels": 8},
                    {"category": "Forest Dept Tree Clearance NOC", "impactPercent": 9, "criticalParcels": 2}
                ],
                "recommendation": "Deploy Special Lok Adalat bench for Bellandur cluster (Sy 48/2A) to compress 45 calendar days."
            }
            self._send_json(prediction)
        elif path == "/api/py/parcels":
            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute("SELECT id, survey_no, khata_no, village, owner, extent, total_award, status FROM parcels")
            rows = cursor.fetchall()
            conn.close()
            parcels = [
                {"id": r[0], "surveyNo": r[1], "khataNo": r[2], "village": r[3], "owner": r[4], "extent": r[5], "totalAward": r[6], "status": r[7]}
                for r in rows
            ]
            self._send_json({"success": True, "count": len(parcels), "parcels": parcels})
        elif path == "/api/py/gazette":
            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute("SELECT id, notification_no, title, section, area, status FROM gazette_notices")
            rows = cursor.fetchall()
            conn.close()
            gazettes = [
                {"id": r[0], "notificationNo": r[1], "title": r[2], "section": r[3], "area": r[4], "status": r[5]}
                for r in rows
            ]
            self._send_json({"success": True, "count": len(gazettes), "notices": gazettes})
        else:
            self._send_json({"error": "Endpoint not found", "path": path}, status=404)

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/py/turnaround-simulation":
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else "{}"
            try:
                payload = json.loads(body)
            except Exception:
                payload = {}

            baseline_days = payload.get("baselineDays", 180)
            ai_acceleration_factor = 0.233
            simulated_days = int(baseline_days * ai_acceleration_factor)

            simulation_result = {
                "success": True,
                "simulationId": "SIM-2025-KA-882",
                "baselineTurnaroundDays": baseline_days,
                "simulatedTurnaroundDays": simulated_days,
                "daysSaved": baseline_days - simulated_days,
                "costEfficiencyGainPercent": 34.5,
                "disputeReductionProbability": "88.4%",
                "parametersApplied": {
                    "automatedSolatiumCalc": True,
                    "blockchainTitleVerification": True,
                    "pfmsDirectEscrow": True,
                    "digitalDscStamping": True
                },
                "status": "SIMULATION_COMPLETED"
            }
            self._send_json(simulation_result)
        else:
            self._send_json({"error": "Endpoint not found", "path": path}, status=404)

def run():
    init_db()
    print("=======================================================")
    print("🐍 Python Backend Microservice for Bhoomi Setu Running")
    print(f"🌐 Server: http://localhost:{PORT}")
    print(f"📡 Delay Prediction: http://localhost:{PORT}/api/py/delay-prediction")
    print(f"⚙️ Simulation API: POST http://localhost:{PORT}/api/py/turnaround-simulation")
    print("=======================================================")
    httpd = HTTPServer(('0.0.0.0', PORT), BhoomiPythonHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping Python microservice...")

if __name__ == "__main__":
    run()
