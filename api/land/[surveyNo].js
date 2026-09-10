const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const { surveyNo } = req.query;
  const sKey = (surveyNo || '48-2A').replace('/', '-');

  const defaultParcels = {
    '48-2A': {
      id: "48-2A",
      surveyNo: "48/2A",
      khataNo: "1842/48",
      village: "Bellandur",
      taluk: "Bengaluru East",
      district: "Bengaluru Urban",
      owner: "Rajesh Kumar S/o Late S. Muniyappa",
      extent: "1.45 Acres (58 Guntas)",
      guidanceValue: "₹ 3,20,00,000",
      solatium100: "₹ 3,20,00,000",
      interest12Pct: "₹ 38,40,000",
      totalAward: "₹ 6,78,40,000",
      status: "SEC_19_DECLARED",
      project: "Namma Metro Phase 2A (ORR Reach 5)",
      pfmsRef: "PFMS2025KA048912",
      pfmsStatus: "PFMS Direct Escrow Credit Initiated"
    },
    '56-2': {
      id: "56-2",
      surveyNo: "56/2",
      khataNo: "GOVT-56",
      village: "Chikkabanavara",
      taluk: "Bengaluru North",
      district: "Bengaluru Urban",
      owner: "Government of Karnataka (Revenue Dept)",
      extent: "3.20 Acres (128 Guntas)",
      guidanceValue: "₹ 0",
      solatium100: "₹ 0",
      interest12Pct: "₹ 0",
      totalAward: "₹ 0 (Public Gomal)",
      status: "GOVT_AVAILABLE",
      project: "Civic Amenity Allotment (PHC)",
      pfmsRef: "N/A",
      pfmsStatus: "Public Asset Available"
    }
  };

  const parcel = defaultParcels[sKey] || defaultParcels['48-2A'];
  res.status(200).json({ success: true, parcel });
};
