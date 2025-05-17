// Vercel Serverless Function 기본 템플릿
module.exports = (req, res) => {
  res.status(200).json({ message: "Proxy server is running." });
};
