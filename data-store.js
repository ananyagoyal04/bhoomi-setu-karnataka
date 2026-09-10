// Bhoomi Setu — Authentic Karnataka Land Acquisition Dataset
// Schema aligned with Karnataka Bhoomi, BhoomiRashi (MoRTH), and data.gov.in
window.BHOOMI_DATA = {
  // 3 Clear Demo Personas
  demoUsers: {
    citizen: {
      id: "CITIZEN_RAJESH_01",
      role: "citizen",
      roleLabel: "👨‍🌾 Landowner / Citizen",
      name: "Sri. Rajesh Kumar",
      fatherName: "Late S. Muniyappa",
      aadhaarMasked: "XXXX-XXXX-4819",
      mobile: "+91 98450 12894",
      district: "Bengaluru Urban",
      taluk: "Bengaluru East",
      hobli: "Varthur",
      village: "Bellandur",
      khataNo: "1842/48",
      primarySurveyNo: "48/2A",
      extentAcres: "1.45 Acres (58 Guntas)",
      totalAward: "₹ 6,78,40,000",
      bankName: "Canara Bank (Bellandur Branch)",
      accountNoMasked: "XXXX-XXXX-9182",
      ifsc: "CNRB0001892",
      pfmsRef: "PFMS2025KA048912",
      pfmsStatus: "Direct Escrow Credit Initiated"
    },
    officer: {
      id: "SLAO_SHIVARAM_02",
      role: "officer",
      roleLabel: "👔 Land Acquisition Officer (SLAO)",
      name: "Sri. B. Shivaram, KAS",
      designation: "Special Land Acquisition Officer (SLAO) — Bengaluru East & North",
      empCode: "KAS-2012-0894",
      department: "Revenue Department, Govt of Karnataka",
      dscTokenId: "ePass2003Auto-98FC-4421",
      dscStatus: "Class-3 Cryptographic Token Active (Valid till 2027)"
    },
    executive: {
      id: "EXEC_CHIEF_SEC_03",
      role: "executive",
      roleLabel: "🏢 Chief Secretary (State Command)",
      name: "Chief Secretary to Government of Karnataka",
      designation: "Head of Infrastructure Oversight & High Power Committee",
      department: "Cabinet Secretariat, Vidhana Soudha",
      projectScope: "Namma Metro Phase 2A/2B, PRR Stage 1, K-RIDE Suburban Rail"
    }
  },

  // 13 Namma Metro Phase 2A Stations (Outer Ring Road Line - Silk Board to KR Puram, 18.2 km)
  metroStations: [
    { id: 1, name: "Central Silk Board", coords: [12.9175, 77.6234], chainage: "CH 0+000", acquiredParcels: "28/28", status: "100% Acquired • Piers 84%", type: "Interchange Hub" },
    { id: 2, name: "HSR Layout", coords: [12.9168, 77.6385], chainage: "CH 1+850", acquiredParcels: "24/24", status: "100% Acquired • Concourse Cast", type: "Elevated Station" },
    { id: 3, name: "Agara Lake", coords: [12.9242, 77.6620], chainage: "CH 4+200", acquiredParcels: "30/30", status: "100% Acquired • Pier Caps Erected", type: "Elevated Station" },
    { id: 4, name: "Iblur Junction", coords: [12.9255, 77.6710], chainage: "CH 5+400", acquiredParcels: "22/22", status: "100% Acquired • Viaduct Span 70%", type: "Elevated Station" },
    { id: 5, name: "Bellandur (Near Sy 48/2A)", coords: [12.9265, 77.6770], chainage: "CH 6+850", acquiredParcels: "32/32", status: "100% Acquired (Sec 19 Gazetted)", type: "Elevated Station" },
    { id: 6, name: "Kadubeesanahalli", coords: [12.9320, 77.6890], chainage: "CH 8+300", acquiredParcels: "26/28", status: "Utility Shifting (BESCOM 66kV)", type: "Elevated Station" },
    { id: 7, name: "Kodibeesanahalli", coords: [12.9390, 77.6940], chainage: "CH 9+600", acquiredParcels: "24/24", status: "100% Acquired • Foundation Ready", type: "Elevated Station" },
    { id: 8, name: "Marathahalli", coords: [12.9460, 77.6980], chainage: "CH 11+100", acquiredParcels: "36/36", status: "100% Acquired • Viaduct Erected", type: "Elevated Station" },
    { id: 9, name: "ISRO / Karthik Nagar", coords: [12.9650, 77.7010], chainage: "CH 13+200", acquiredParcels: "20/20", status: "100% Acquired • Girders Placed", type: "Elevated Station" },
    { id: 10, name: "Doddanekundi", coords: [12.9750, 77.6920], chainage: "CH 14+700", acquiredParcels: "22/22", status: "100% Acquired • Concourse Work", type: "Elevated Station" },
    { id: 11, name: "DRDO Sports Complex", coords: [12.9860, 77.6800], chainage: "CH 16+100", acquiredParcels: "18/18", status: "100% Acquired • Track Slab Cast", type: "Elevated Station" },
    { id: 12, name: "Sarasvathi Nagar", coords: [12.9940, 77.6770], chainage: "CH 17+200", acquiredParcels: "16/16", status: "100% Acquired • Civil Structure 90%", type: "Elevated Station" },
    { id: 13, name: "KR Puram Terminal", coords: [13.0000, 77.6750], chainage: "CH 18+200", acquiredParcels: "40/40", status: "Intermodal Hub Underway", type: "Interchange Terminal" }
  ],

  // Cadastral Survey Plots (Bhoomi Schema)
  parcels: [
    {
      id: "48-2A",
      surveyNo: "48/2A",
      hissaNo: "2A",
      khataNo: "1842/48",
      district: "Bengaluru Urban",
      taluk: "Bengaluru East",
      hobli: "Varthur",
      village: "Bellandur",
      owner: "Rajesh Kumar S/o Late S. Muniyappa",
      aadhaarMasked: "XXXX-XXXX-4819",
      extentAcres: "1.45 Acres (58 Guntas)",
      landClass: "Dry Agricultural (Converted)",
      project: "Bengaluru Metro Phase 2A (ORR Line)",
      stage: "Section 19(1) Final Declaration Published",
      statusCode: "SEC_19_DECLARED",
      colorTag: "#ba1a1a", // Red: Acquired
      guidanceValue: "₹ 3,20,00,000",
      solatium100: "₹ 3,20,00,000",
      interest12Pct: "₹ 38,40,000",
      totalAward: "₹ 6,78,40,000",
      pfmsStatus: "PFMS Direct Credit Initiated (Canara Bank XXXX-9182)",
      disputeNotes: "Section 15(1) Valuation Objection: 14 Coconut Trees & Borewell valuation requested (+₹18.5 Lakhs)",
      coordinates: [12.9279, 77.6771],
      polygon: [
        [12.9270, 77.6755],
        [12.9290, 77.6760],
        [12.9285, 77.6785],
        [12.9265, 77.6775]
      ]
    },
    {
      id: "48-1",
      surveyNo: "48/1",
      hissaNo: "1",
      khataNo: "1840/48",
      district: "Bengaluru Urban",
      taluk: "Bengaluru East",
      hobli: "Varthur",
      village: "Bellandur",
      owner: "Smt. Shanthamma & 2 Others",
      extentAcres: "2.10 Acres (84 Guntas)",
      landClass: "Agricultural",
      project: "Bengaluru Metro Phase 2A",
      stage: "Section 23 Award Finalized & Disbursed",
      statusCode: "DISBURSED",
      colorTag: "#006b5b", // Blue/Teal: Disbursed
      totalAward: "₹ 9,45,00,000",
      pfmsStatus: "Disbursed to Beneficiary Bank A/c",
      coordinates: [12.9300, 77.6740],
      polygon: [
        [12.9295, 77.6730],
        [12.9315, 77.6735],
        [12.9310, 77.6755],
        [12.9290, 77.6750]
      ]
    },
    {
      id: "48-2B",
      surveyNo: "48/2B",
      hissaNo: "2B",
      khataNo: "1843/48",
      district: "Bengaluru Urban",
      taluk: "Bengaluru East",
      hobli: "Varthur",
      village: "Bellandur",
      owner: "Sri. K. Venkataramanappa",
      extentAcres: "0.85 Acres (34 Guntas)",
      landClass: "Dry Agricultural",
      project: "Bengaluru Metro Phase 2A",
      stage: "Section 11(1) Preliminary Notification Active",
      statusCode: "SEC_11_ACTIVE",
      colorTag: "#b45309", // Amber: Preliminary
      totalAward: "₹ 3,82,50,000",
      pfmsStatus: "Dossier under SLAO Technical Scrutiny",
      coordinates: [12.9255, 77.6790],
      polygon: [
        [12.9250, 77.6780],
        [12.9265, 77.6785],
        [12.9260, 77.6805],
        [12.9245, 77.6800]
      ]
    },
    {
      id: "56-2",
      surveyNo: "56/2",
      hissaNo: "2",
      khataNo: "GOVT-56",
      district: "Bengaluru Urban",
      taluk: "Bengaluru North",
      hobli: "Hesaraghatta",
      village: "Chikkabanavara",
      owner: "Government of Karnataka (Revenue Dept)",
      extentAcres: "3.20 Acres (128 Guntas)",
      landClass: "Vacant Public Gomal Land",
      project: "Civic Amenity Allotment (Primary Healthcare Centre)",
      stage: "Available for Civic Allotment (Form 49-B)",
      statusCode: "GOVT_AVAILABLE",
      colorTag: "#15803d", // Green: Public Land
      totalAward: "₹ 0 (Government Asset)",
      pfmsStatus: "Public Allotment Single Window",
      coordinates: [13.0722, 77.5085],
      polygon: [
        [13.0710, 77.5070],
        [13.0735, 77.5075],
        [13.0730, 77.5100],
        [13.0705, 77.5090]
      ]
    },
    {
      id: "12-4",
      surveyNo: "12/4",
      hissaNo: "4",
      khataNo: "982/12",
      district: "Bengaluru Urban",
      taluk: "Bengaluru North",
      hobli: "Yelahanka",
      village: "Yelahanka Amanikere",
      owner: "Rajesh Kumar (Ancestral Title)",
      extentAcres: "2.10 Acres (84 Guntas)",
      landClass: "Wetland Lake Buffer Protected",
      project: "Bengaluru Suburban Railway (K-RIDE Corridor 2)",
      stage: "Section 11(1) Survey Verified",
      statusCode: "SEC_11_ACTIVE",
      colorTag: "#b45309",
      totalAward: "₹ 5,25,00,000",
      pfmsStatus: "Title Verification Approved",
      coordinates: [13.1005, 77.5960],
      polygon: [
        [13.0995, 77.5950],
        [13.1020, 77.5955],
        [13.1015, 77.5980],
        [13.0990, 77.5975]
      ]
    }
  ],

  // Administrative Cascaded Hierarchy
  locations: {
    "Bengaluru Urban": {
      "Bengaluru East": {
        "Varthur": ["Bellandur", "Gunjur", "Panathur", "Varthur"],
        "Bidarahalli": ["Avalahalli", "Battarahalli", "Cheemasandra"],
        "KR Puram": ["Hoodi", "Mahadevapura", "Ramamurthy Nagar"]
      },
      "Bengaluru North": {
        "Yelahanka": ["Allalasandra", "Amruthahalli", "Attur", "Yelahanka Amanikere"],
        "Hesaraghatta": ["Chikkabanavara", "Hesaraghatta", "Silvepura"],
        "Jala": ["Bagalur", "Budigere", "Maralagunte"]
      },
      "Bengaluru South": {
        "Begur": ["Electronic City", "Hulimavu", "Konappana Agrahara"],
        "Kengeri": ["Hemmigepura", "Kengeri Satellite Town", "Kumbalgodu"],
        "Uttarahalli": ["Channasandra", "Subramanyapura", "Vajarahalli"]
      }
    }
  }
};
