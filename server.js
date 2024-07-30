const express = require('express');
const multer = require('multer');
const app = express();
const port = 8001;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle POST request for market data
app.post('/market', upload.array('market_imgs[]'), (req, res) => {
  try {
    // Extracting fields from req.body
    const {
      market_id,
      user_id,
      market_title,
      market_category,
      user_name,
      market_contents,
      market_price,
      market_maxprice,
      user_mail,
      market_createat,
      market_updateat,
      market_selldate,
      market_duration,
      market_period,
      market_view,
      market_orderablestatus
    } = req.body;

    // Validate fields
    if (!market_id || !user_id || !market_title || !market_category ||
        !user_name || !market_contents || !market_price || !market_maxprice ||
        !user_mail || !market_createat || !market_updateat || !market_selldate ||
        !market_period || !market_view || !market_orderablestatus || !market_duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Process files if any
    const files = req.files;

    // Save data to database or perform other operations
    // ...

    // Send success response
    res.status(200).json({ message: 'Market data received successfully', id: market_id });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
