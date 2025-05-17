const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbxh5jbjWVDMAneIxAa2l0e7ujlI_fJjTVX7zNKrG4PlK24TydWk53FPTVEIDFnfWLFVOA/exec';
    
    try {
      const response = await fetch(googleScriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
