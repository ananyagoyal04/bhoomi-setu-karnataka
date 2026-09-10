// Bhoomi Setu — Karnataka Land Acquisition Dataset
// Aligned with Karnataka Bhoomi, BhoomiRashi (MoRTH), and data.gov.in
window.BHOOMI_DATA = {
  // 3 Pre-Fed Demo Aadhaar Logins
  demoUsers: {
    citizen: {
      id: "CITIZEN_RAJESH_01",
      aadhaar: "5489-1204-4819",
      role: "citizen",
      roleLabel: "👨‍🌾 Landowner / Citizen",
      name: "Sri. Rajesh Kumar",
      fatherName: "Late S. Muniyappa",
      aadhaarMasked: "5489-XXXX-4819",
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
      aadhaar: "8921-4421-0894",
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
      aadhaar: "1102-9934-0001",
      role: "executive",
      roleLabel: "🏢 Chief Secretary (State Command)",
      name: "Chief Secretary to Government of Karnataka",
      designation: "Head of Infrastructure Oversight & High Power Committee",
      department: "Cabinet Secretariat, Vidhana Soudha",
      projectScope: "Namma Metro Phase 2A/2B, PRR Stage 1, K-RIDE Suburban Rail"
    }
  },

  // Exactly 2 Demo Parcels
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
      aadhaarMasked: "5489-XXXX-4819",
      extentAcres: "1.45 Acres (58 Guntas)",
      landClass: "Converted Dry Agricultural",
      project: "Bengaluru Metro Phase 2A (ORR Line)",
      stage: "Section 19(1) Final Declaration Published",
      statusCode: "SEC_19_DECLARED",
      colorTag: "#ba1a1a",
      guidanceValue: "₹ 3,20,00,000",
      solatium100: "₹ 3,20,00,000",
      interest12Pct: "₹ 38,40,000",
      totalAward: "₹ 6,78,40,000",
      pfmsStatus: "PFMS Direct Credit Initiated (Canara Bank XXXX-9182)",
      disputeNotes: "Valuation Objection: 14 Coconut Trees & Borewell (+₹18.5 Lakhs)",
      coordinates: [12.9279, 77.6771],
      polygon: [
        [12.9270, 77.6755],
        [12.9290, 77.6760],
        [12.9285, 77.6785],
        [12.9265, 77.6775]
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
      colorTag: "#15803d",
      totalAward: "₹ 0 (Government Asset)",
      pfmsStatus: "Public Allotment Single Window",
      coordinates: [13.0722, 77.5085],
      polygon: [
        [13.0710, 77.5070],
        [13.0735, 77.5075],
        [13.0730, 77.5100],
        [13.0705, 77.5090]
      ]
    }
  ],

  // Exactly 2 Gazette Notices
  gazetteNotices: [
    {
      id: "RD-LAQ-SH17-2025-09",
      title: "SH-17 Expressway Corridor Expansion: Hubballi-Dharwad Bypass",
      section: "SECTION 19(1)",
      status: "Ready to Stamp",
      statusClass: "bg-primary/15 text-primary",
      district: "Dharwad (Navalgund, Hubballi)",
      area: "148.60 Acres (68 Parcels)",
      targetDate: "Today, 05:30 PM IST",
      drafter: "Verified by Dr. R. Bhat",
      kannadaHeading: "ಕರ್ನಾಟಕ ರಾಜ್ಯಪತ್ರ — ವಿಶೇಷ ಪತ್ರಿಕೆ",
      notificationNo: "RD-LAQ-SH17-2025-09/BLR",
      publishedDate: "14th March 2025"
    },
    {
      id: "RD-LAQ-METRO3-2025-03",
      title: "Namma Metro Phase 3: Magadi Road Depot & Stabling Yard",
      section: "SECTION 19(1)",
      status: "Statutory Expiry Risk",
      statusClass: "bg-error/15 text-error",
      district: "Bengaluru Urban (Bangalore South)",
      area: "180.00 Acres (114 Parcels)",
      targetDate: "Tomorrow, 11:00 AM IST",
      drafter: "Awaiting SLAO Seal",
      kannadaHeading: "ಕರ್ನಾಟಕ ರಾಜ್ಯಪತ್ರ — ಅಧಿಕೃತ ಪ್ರಕಟಣೆ",
      notificationNo: "RD-LAQ-METRO3-2025-03/BLR",
      publishedDate: "18th March 2025"
    }
  ],

  // Exactly 2 Document Dossiers for Verification
  dossiers: [
    {
      id: "dossier-48-2a",
      surveyNo: "Survey No. 48/2A",
      village: "Bellandur Hobli, Bengaluru East",
      title: "Form 9 Joint Survey Consent Notice & Title Deed",
      claimant: "Sri Muniraju H. (Rajesh Kumar)",
      khataRef: "#BLR-EST/4421",
      submissionDate: "14 Feb 2025 • 11:22 IST",
      fileName: "Form9_JointSurvey_Signed.pdf (2.4 MB)",
      status: "High Delay Risk",
      statusClass: "bg-error/15 text-error",
      note: "Flagged: Missing schedule B annexure / co-signature",
      checkpoints: [
        { title: "Landowner Aadhaar Token matches Bhoomi Khata registry", match: "Verified via UIDAI API & Karnataka Bhoomi Master DB (Match: 98.4%)", passed: true },
        { title: "Survey extent matches 1 Acre 18 Guntas as notified under Sec 11(1)", match: "Validated against Preliminary Gazette Notification No. LAQ/CR-44/2024", passed: true },
        { title: "Physical Mahazar co-signed by adjoining parcel owners", match: "Adjoining boundary owner counter-attestation completed on-site", passed: true },
        { title: "No interim civil stay order verified with District Court e-Filing database", match: "Query executed: Zero injunctive petitions returned for Khata #BLR-EST/4421", passed: true }
      ]
    },
    {
      id: "dossier-56-2",
      surveyNo: "Survey No. 56/2",
      village: "Chikkabanavara, Bengaluru North",
      title: "Civic Amenity Allotment Mahazar & Field RI Report",
      claimant: "Health & Family Welfare Dept",
      khataRef: "#GOVT-56/BN",
      submissionDate: "20 Feb 2025 • 14:05 IST",
      fileName: "CA_Healthcare_Allotment_56-2.pdf (1.8 MB)",
      status: "Clear Title",
      statusClass: "bg-primary/15 text-primary",
      note: "Clear: Public Gomal land statutory transfer verified",
      checkpoints: [
        { title: "Revenue Department Gomal Classification Verified", match: "Tahsil record check: Zero private encumbrance", passed: true },
        { title: "Town & Country Planning Master Plan 2031 Zonal Conformance", match: "Zone: Public / Semi-Public Civic Amenity", passed: true },
        { title: "Joint ADLR Field Boundary Demarcation Map (Shapefile)", match: "DGPS 4-pillar geo-coordinates verified", passed: true },
        { title: "District Commissioner Inter-Departmental NOC", match: "NOC Ref: DC/LAQ/PR-892/2025 signed", passed: true }
      ]
    }
  ],

  // Exactly 2 Quasi-Judicial Hearing Docket Items
  hearings: [
    {
      docketNo: "S15-LAQ/2025/089",
      surveyNo: "Sy. No. 48/2B (0A - 14G)",
      village: "Medahalli, Bidarahalli Hobli",
      petitioner: "Sri. Munivenkatappa & 3 Others",
      advocate: "Advocate: Sri. H. Ramesh Gowda (+91 98452 XXXXX)",
      objectionType: "Measurement & Boundary Dispute",
      objectionDesc: "Contesting 11(1) notification extent; claims physical compound wall encompasses 18 guntas versus notified 14 guntas.",
      hearingStage: "ADLR Spot Survey Ordered",
      actionLabel: "Record Mahazar"
    },
    {
      docketNo: "S15-LAQ/2025/092",
      surveyNo: "Sy. No. 112/1 (1A - 02G)",
      village: "Avalahalli, KR Puram Hobli",
      petitioner: "Smt. Parvathamma (Rep. by GPA Holder)",
      advocate: "Opponent: Sri. B. N. Narayanaswamy (+91 94481 XXXXX)",
      objectionType: "Title Dispute / Rival Ownership",
      objectionDesc: "Rival civil claim pending in OS No. 342/2023 at Devanahalli Senior Civil Court. Requesting reference under Sec 64/77.",
      hearingStage: "Sec 15 Statement Recording",
      actionLabel: "Record Mahazar"
    }
  ],

  // Exactly 2 Public Land Parcels
  publicLand: [
    {
      surveyNo: "Sy. No. 104 — Gomal Land, Varthur",
      taluk: "Bengaluru East Taluk",
      hobli: "Hobli: Varthur-02",
      status: "Open for Applications",
      statusClass: "bg-primary/15 text-primary",
      extent: "4A - 12G (17,391 sq.m)",
      landClass: "Govt Waste (ಖರಾಬು) Unencumbered",
      purpose: "Agricultural Self-Help Lease under Rule 41 / Organic Farming"
    },
    {
      surveyNo: "Sy. No. 56/2 — Chikkabanavara",
      taluk: "Bengaluru North Taluk",
      hobli: "Hobli: Yeshwanthpur-01",
      status: "Open for Applications",
      statusClass: "bg-primary/15 text-primary",
      extent: "2A - 05G (8,599 sq.m)",
      landClass: "Civic Amenity (CA) Statutory Reserve",
      purpose: "Community Healthcare / Primary Public Health Centre"
    }
  ],

  // Exactly 2 State Mega Projects
  projects: [
    {
      id: "bmrcl-phase-2a",
      name: "Bengaluru Metro Phase 2A (Silk Board to KR Puram)",
      agency: "BMRCL",
      lengthKm: "18.2 km",
      stations: 13,
      totalParcels: 348,
      acquiredParcels: 312,
      pendingParcels: 36,
      progressPercent: 89.6,
      budgetCr: "₹ 5,994 Cr",
      disbursedCr: "₹ 1,842 Cr",
      predictedDelayMonths: 4.2,
      mitigatedDelayMonths: 0.8
    },
    {
      id: "bda-prr-1",
      name: "Bengaluru Peripheral Ring Road (PRR Stage 1)",
      agency: "BDA",
      lengthKm: "73.5 km",
      stations: 0,
      totalParcels: 1420,
      acquiredParcels: 980,
      pendingParcels: 440,
      progressPercent: 69.0,
      budgetCr: "₹ 21,091 Cr",
      disbursedCr: "₹ 4,320 Cr",
      predictedDelayMonths: 6.8,
      mitigatedDelayMonths: 1.5
    }
  ],

  // Administrative Hierarchy
  locations: {
    "Bengaluru Urban": {
      "Bengaluru East": {
        "Varthur": ["Bellandur", "Gunjur", "Panathur", "Varthur"],
        "KR Puram": ["Hoodi", "Mahadevapura", "Ramamurthy Nagar"]
      },
      "Bengaluru North": {
        "Yelahanka": ["Allalasandra", "Amruthahalli", "Yelahanka Amanikere"],
        "Hesaraghatta": ["Chikkabanavara", "Hesaraghatta"]
      }
    }
  }
};
