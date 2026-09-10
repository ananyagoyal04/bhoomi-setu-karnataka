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
    data: {
      totalAcquisitionHa: 1420.5,
      disbursedCrores: 4820.4,
      pendingEscrowCrores: 1174.2,
      parcelsTracked: 348,
      activeMetroStations: 13,
      disputeReductionRate: "88.4%",
      avgTurnaroundDays: 42
    }
  });
};
