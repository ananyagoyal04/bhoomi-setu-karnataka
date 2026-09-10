module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const payload = req.body || {};
  const newObj = {
    id: `OBJ-${Date.now().toString().slice(-4)}`,
    surveyNo: payload.surveyNo || '48/2A',
    claimant: payload.claimant || 'Sri. Rajesh Kumar',
    objectionType: payload.objectionType || 'Valuation Rectification',
    demandedExtra: payload.demandedExtra || 1850000,
    status: 'SCHEDULED_FOR_HEARING',
    createdAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    message: 'Section 15(1) Objection Registered in Gazette Docket',
    objection: newObj
  });
};
