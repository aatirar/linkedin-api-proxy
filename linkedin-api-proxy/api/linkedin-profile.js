export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // For testing, return a success message
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'API is working!' });
  }

  if (req.method === 'POST') {
    try {
      const apiKey = process.env.CORESIGNAL_API_KEY;
      
      // Log info for debugging
      console.log('Request received');
      console.log('API Key available:', !!apiKey);
      
      // Forward the request using fetch
      const response = await fetch('https://api.coresignal.com/cdapi/v1/professional_network/employee/search/es_dsl', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      });
      
      // Get response as JSON
      const data = await response.json();
      
      // Return the response
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ 
        error: 'Failed to fetch data',
        details: error.message
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}