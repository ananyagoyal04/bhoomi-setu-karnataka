module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  res.status(200).json({
    success: true,
    parcels: [
      {
        id: "48-2A",
        surveyNo: "48/2A",
        village: "Bellandur",
        owner: "Rajesh Kumar S/o Late S. Muniyappa",
        extent: "1.45 Acres",
        totalAward: "₹ 6,78,40,000",
        status: "SEC_19_DECLARED"
      },
      {
        id: "56-2",
        surveyNo: "56/2",
        village: "Chikkabanavara",
        owner: "Government of Karnataka",
        extent: "3.20 Acres",
        totalAward: "₹ 0 (Public Gomal)",
        status: "GOVT_AVAILABLE"
      }
    ]
  });
};
