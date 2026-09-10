module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    success: true,
    count: 2,
    parcels: [
      {
        id: "48-2A",
        surveyNo: "48/2A",
        khataNo: "1842/48",
        village: "Bellandur",
        owner: "Rajesh Kumar S/o Late S. Muniyappa",
        extent: "1.45 Acres (58 Guntas)",
        totalAward: "₹ 6,78,40,000",
        stage: "Section 19(1) Final Declaration Published"
      },
      {
        id: "56-2",
        surveyNo: "56/2",
        khataNo: "GOVT-56",
        village: "Chikkabanavara",
        owner: "Government of Karnataka (Revenue Dept)",
        extent: "3.20 Acres (128 Guntas)",
        totalAward: "₹ 0 (Government Asset)",
        stage: "Available for Civic Allotment (Form 49-B)"
      }
    ]
  });
};
