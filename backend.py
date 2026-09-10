"""
Bhoomi Setu — Python FastAPI / Flask Backend Gateway
Government of Karnataka | Revenue Department Land Acquisition API
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
                "runtime": f"Python {sys.version.split()[0]}",
                "framework": "Bhoomi Python Microservice",
                "database": "SQLite 3 Engine",
                "portal": "Bhoomi Setu (Govt of Karnataka)"
            })
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
            self._send_json({"error": "Endpoint not found"}, status=404)

if __name__ == "__main__":
    init_db()
    print("=======================================================")
    print("🐍 Python Backend Gateway for Bhoomi Setu Running")
    print(f"🌐 REST API: http://localhost:{PORT}/api/py/health")
    print("=======================================================")
    httpd = HTTPServer(('0.0.0.0', PORT), BhoomiPythonHandler)
    httpd.serve_forever()
