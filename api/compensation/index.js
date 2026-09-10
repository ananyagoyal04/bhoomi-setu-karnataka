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
    surveyNo: "48/2A",
    guidanceValue: "₹ 3,20,00,000",
    solatium100: "₹ 3,20,00,000",
    interest12Pct: "₹ 38,40,000",
    totalAward: "₹ 6,78,40,000",
    pfmsRef: "PFMS2025KA048912",
    pfmsStatus: "PFMS Direct Escrow Credit Initiated"
  });
};
