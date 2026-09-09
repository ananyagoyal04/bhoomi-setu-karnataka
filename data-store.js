// Bhoomi Setu — Central In-Memory Dynamic Dataset (Government of Karnataka)
window.BHOOMI_DATA = {
  // Administrative Hierarchy
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
    },
    "Bengaluru Rural": {
      "Devanahalli": {
        "Kasaba": ["Devanahalli Town", "Binnamangala", "Vijayapura"],
        "Kundana": ["Arisinakunte", "Kundana", "Vishwanathapura"]
      },
      "Hosakote": {
        "Kasaba": ["Hosakote Town", "Doddagattiganabbe"],
        "Anugondanahalli": ["Anugondanahalli", "Devangonthi"]
      },
      "Nelamangala": {
        "Kasaba": ["Nelamangala Town", "Arasinakunte"],
        "Sompura": ["Dabaspete", "Niduvanda", "Sompura"]
      }
    }
  },

  // Registered Cadastral Survey Parcels
  parcels: [
    {
      id: "48-2A",
      surveyNo: "48/2A",
      district: "Bengaluru Urban",
      taluk: "Bengaluru East",
      hobli: "Varthur",
      village: "Bellandur",
      owner: "Rajesh Kumar S/o S. Muniyappa",
      aadhaarMasked: "XXXX-XXXX-4819",
      extentAcres: "1.45 Acres (58 Guntas)",
      landClass: "Dry Agricultural (Converted)",
      project: "Bengaluru Metro Phase 2A (Outer Ring Road Line)",
      stage: "Section 19(1) Declared",
      stageCode: "SEC_19_1",
      guidanceValue: "₹ 3,20,00,000",
      solatium100: "₹ 3,20,00,000",
      additionalInterest: "₹ 38,40,000",
      totalAward: "₹ 6,78,40,000",
      pfmsStatus: "PFMS Escrow Direct Credit Initiated",
      disputeStatus: "Lok Adalat Hearing Scheduled (Valuation Objection)",
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
      district: "Bengaluru Urban",
      taluk: "Bengaluru East",
      hobli: "Varthur",
      village: "Bellandur",
      owner: "Smt. Shanthamma & 2 Others",
      extentAcres: "2.10 Acres",
      landClass: "Agricultural",
      project: "Bengaluru Metro Phase 2A",
      stage: "Section 23 Award Finalized",
      totalAward: "₹ 9,45,00,000",
      pfmsStatus: "Disbursed to Canara Bank A/c",
      coordinates: [12.9300, 77.6740]
    },
    {
      id: "48-2B",
      surveyNo: "48/2B",
      district: "Bengaluru Urban",
      taluk: "Bengaluru East",
      hobli: "Varthur",
      village: "Bellandur",
      owner: "Sri. K. Venkataramanappa",
      extentAcres: "0.85 Acres",
      landClass: "Commercial Encroachment Free",
      project: "Bengaluru Metro Phase 2A",
      stage: "Section 11(1) Preliminary Notice",
      totalAward: "₹ 3,82,50,000",
      pfmsStatus: "Dossier under SLAO Scrutiny",
      coordinates: [12.9255, 77.6790]
    },
    {
      id: "56-2",
      surveyNo: "56/2",
      district: "Bengaluru Urban",
      taluk: "Bengaluru North",
      hobli: "Hesaraghatta",
      village: "Chikkabanavara",
      owner: "Government of Karnataka (Revenue Dept)",
      extentAcres: "3.20 Acres (Gomal Land)",
      landClass: "Government Public Land (Vacant)",
      project: "Primary Healthcare & Civic Amenity Allotment",
      stage: "Available for Statutory Allotment (Form 49-B)",
      stageCode: "GOVT_AVAILABLE",
      allotmentCategory: "Civic Amenity / Public Health",
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
      district: "Bengaluru Urban",
      taluk: "Bengaluru North",
      hobli: "Yelahanka",
      village: "Yelahanka Amanikere",
      owner: "Rajesh Kumar (Inherited Ancestral Title)",
      extentAcres: "2.10 Acres",
      landClass: "Wet Land (Buffer Protected)",
      project: "Suburban Rail Corridor 2 (K-RIDE)",
      stage: "Section 11(1) Survey Verified",
      totalAward: "₹ 5,25,00,000",
      pfmsStatus: "Title Verification Complete",
      coordinates: [13.1005, 77.5960]
    }
  ],

  // State Mega Infrastructure Projects
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
      mitigatedDelayMonths: 0.8,
      primaryDelayCause: "High Court Writs & BESCOM 66kV Utility Shifting"
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
      mitigatedDelayMonths: 1.5,
      primaryDelayCause: "Section 27 Valuation Revision Demands"
    },
    {
      id: "kride-corridor-2",
      name: "Bengaluru Suburban Rail Project (Corridor 2 - Mallige Line)",
      agency: "K-RIDE",
      lengthKm: "25.0 km",
      stations: 14,
      totalParcels: 210,
      acquiredParcels: 188,
      pendingParcels: 22,
      progressPercent: 89.5,
      budgetCr: "₹ 4,200 Cr",
      disbursedCr: "₹ 890 Cr",
      predictedDelayMonths: 2.1,
      mitigatedDelayMonths: 0.4,
      primaryDelayCause: "Defense Land & Railway Concurrence"
    }
  ],

  // Statutory Litigations & Caveats
  litigations: [
    {
      wpNo: "WP 18492/2024",
      court: "Hon'ble High Court of Karnataka (Bench 3)",
      petitioner: "Rajesh Kumar vs State of Karnataka & BMRCL",
      surveyNo: "48/2A Bellandur",
      stage: "Interim Stay on Physical Possession pending Solatium Re-computation",
      govtPleader: "Sri. K. Raghavendra (Advocate General Desk)",
      actionRequired: "File Urgent Vacation Application under Sec 64 Escrow Undertaking",
      daysSavedIfVacated: 45
    },
    {
      wpNo: "WP 22104/2024",
      court: "City Civil Court Bengaluru (Lok Adalat)",
      petitioner: "Partition Claim: Venkatamma vs Muniyappa Heirs",
      surveyNo: "104/1B Kadubeesanahalli",
      stage: "Section 77 Statutory Escrow Deposit Recommended",
      govtPleader: "District Govt Pleader (Civil)",
      actionRequired: "Deposit ₹2.40 Cr in Principal District Court Escrow Account",
      daysSavedIfVacated: 30
    }
  ],

  // Inter-Agency Utility Relocations
  utilities: [
    {
      agency: "BESCOM",
      type: "66kV High-Tension Transmission Overhead Lines (Span 12-16)",
      location: "Outer Ring Road - Bellandur Flyover",
      costEstimate: "₹ 14.80 Cr",
      status: "Joint Deposit Deposited • Physical Shifting 65%",
      criticality: "High"
    },
    {
      agency: "BWSSB",
      type: "1200mm Bulk Water Supply Pipeline (Cauvery Stage IV)",
      location: "Kadubeesanahalli Junction",
      costEstimate: "₹ 8.40 Cr",
      status: "Tender Awarded • ROW Clearance In Progress",
      criticality: "Medium"
    },
    {
      agency: "GAIL Gas",
      type: "Natural Gas Distribution Steel Mains",
      location: "Silk Board interchange",
      costEstimate: "₹ 3.20 Cr",
      status: "Safety Clearance Granted • Night Works Active",
      criticality: "Low"
    }
  ],

  // AI Mitigation Recommendations Presets
  mitigationActions: [
    {
      id: "action-escrow",
      title: "File Section 64/77 Disputed Escrow Motion",
      agency: "Revenue Dept / BMRCL",
      timelineSavingDays: 45,
      costSavingCr: 32.4,
      defaultActive: true
    },
    {
      id: "action-hc-vacation",
      title: "Special Motion for High Court Stay Vacation",
      agency: "Advocate General Desk",
      timelineSavingDays: 30,
      costSavingCr: 24.0,
      defaultActive: true
    },
    {
      id: "action-utility-tripartite",
      title: "Authorize Tripartite Escrow Fund with BESCOM/BWSSB",
      agency: "Infrastructure Finance Desk",
      timelineSavingDays: 27,
      costSavingCr: 18.5,
      defaultActive: true
    },
    {
      id: "action-lok-adalat",
      title: "Fast-Track Special Lok Adalat Hearing Desk",
      agency: "District Legal Services Authority (DLSA)",
      timelineSavingDays: 15,
      costSavingCr: 9.1,
      defaultActive: true
    }
  ]
};
