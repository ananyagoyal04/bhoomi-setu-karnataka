-- Bhoomi Setu — Enterprise Relational Database Schema (SQL)
-- Government of Karnataka | Revenue Department Master Schema
-- Standard: Aligned with Bhoomi, BhoomiRashi (MoRTH) & PFMS

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    aadhaar_masked VARCHAR(20) NOT NULL,
    role VARCHAR(30) NOT NULL CHECK (role IN ('citizen', 'officer', 'executive', 'public')),
    full_name VARCHAR(150) NOT NULL,
    designation VARCHAR(150),
    department VARCHAR(150),
    mobile VARCHAR(20),
    dsc_token_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cadastral_parcels (
    id VARCHAR(50) PRIMARY KEY,
    survey_no VARCHAR(30) NOT NULL,
    hissa_no VARCHAR(10),
    khata_no VARCHAR(50) NOT NULL,
    district VARCHAR(100) NOT NULL,
    taluk VARCHAR(100) NOT NULL,
    hobli VARCHAR(100) NOT NULL,
    village VARCHAR(100) NOT NULL,
    owner_name VARCHAR(200) NOT NULL,
    extent_acres DECIMAL(10,4) NOT NULL,
    extent_guntas INT NOT NULL,
    land_class VARCHAR(100),
    project_id VARCHAR(50),
    stage VARCHAR(100),
    guidance_value DECIMAL(15,2),
    solatium_100 DECIMAL(15,2),
    interest_12pct DECIMAL(15,2),
    total_award DECIMAL(15,2),
    pfms_ref VARCHAR(50),
    pfms_status VARCHAR(100),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gazette_notices (
    id VARCHAR(50) PRIMARY KEY,
    notification_no VARCHAR(100) UNIQUE NOT NULL,
    project_title VARCHAR(255) NOT NULL,
    section_code VARCHAR(30) NOT NULL,
    district VARCHAR(100) NOT NULL,
    total_area_acres DECIMAL(10,2),
    total_parcels INT,
    status VARCHAR(50),
    published_date DATE,
    kannada_heading TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quasi_judicial_hearings (
    id VARCHAR(50) PRIMARY KEY,
    docket_no VARCHAR(100) UNIQUE NOT NULL,
    survey_no VARCHAR(50) NOT NULL,
    village VARCHAR(100) NOT NULL,
    petitioner_name VARCHAR(200) NOT NULL,
    advocate_contact VARCHAR(100),
    objection_type VARCHAR(100) NOT NULL,
    objection_summary TEXT,
    hearing_stage VARCHAR(100),
    hearing_date DATE,
    status VARCHAR(50) DEFAULT 'SCHEDULED'
);

CREATE TABLE IF NOT EXISTS public_land_directory (
    id VARCHAR(50) PRIMARY KEY,
    survey_no VARCHAR(50) NOT NULL,
    taluk VARCHAR(100) NOT NULL,
    hobli VARCHAR(100) NOT NULL,
    extent_description VARCHAR(100),
    land_classification VARCHAR(100),
    permitted_statutory_purpose TEXT,
    status VARCHAR(50) DEFAULT 'OPEN_FOR_APPLICATION'
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action_type VARCHAR(100) NOT NULL,
    user_id VARCHAR(50),
    user_role VARCHAR(50),
    ip_address VARCHAR(45),
    details_json TEXT
);

-- Seed Initial 2 Records per Category
INSERT INTO users (id, aadhaar_masked, role, full_name, designation, department) VALUES
('CITIZEN_RAJESH_01', '5489-XXXX-4819', 'citizen', 'Sri. Rajesh Kumar', 'Landowner (Sy 48/2A)', 'Revenue Citizen'),
('SLAO_SHIVARAM_02', '8921-XXXX-0894', 'officer', 'Sri. B. Shivaram, KAS', 'Special Land Acquisition Officer', 'Revenue Dept, GoK'),
('EXEC_CHIEF_SEC_03', '1102-XXXX-0001', 'executive', 'Chief Secretary', 'Head of Infrastructure HPC', 'Cabinet Secretariat');

INSERT INTO cadastral_parcels (id, survey_no, hissa_no, khata_no, district, taluk, hobli, village, owner_name, extent_acres, extent_guntas, land_class, total_award, pfms_ref, latitude, longitude) VALUES
('48-2A', '48/2A', '2A', '1842/48', 'Bengaluru Urban', 'Bengaluru East', 'Varthur', 'Bellandur', 'Rajesh Kumar S/o Late S. Muniyappa', 1.45, 58, 'Converted Dry Agricultural', 67840000.00, 'PFMS2025KA048912', 12.9279, 77.6771),
('56-2', '56/2', '2', 'GOVT-56', 'Bengaluru Urban', 'Bengaluru North', 'Hesaraghatta', 'Chikkabanavara', 'Government of Karnataka', 3.20, 128, 'Vacant Public Gomal', 0.00, 'GOVT-PUBLIC-ALLOT', 13.0722, 77.5085);
