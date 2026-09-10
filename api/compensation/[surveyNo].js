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

  const defaultAwards = {
    '48-2A': {
      surveyNo: "48/2A",
      village: "Bellandur",
      guidanceValue: "₹ 3,20,00,000",
      solatium100: "₹ 3,20,00,000",
      interest12Pct: "₹ 38,40,000",
      totalAward: "₹ 6,78,40,000",
      pfmsRef: "PFMS2025KA048912",
      pfmsStatus: "PFMS Direct Escrow Credit Initiated"
    }
  };

  const comp = defaultAwards[sKey] || defaultAwards['48-2A'];
  res.status(200).json({
    success: true,
    ...comp
  });
};
