module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: "ONLINE",
    portal: "Bhoomi Setu (Government of Karnataka)",
    version: "3.2.0-VERCEL-PROD",
    platform: "Vercel Serverless & Edge Network",
    timestamp: new Date().toISOString()
  });
};
