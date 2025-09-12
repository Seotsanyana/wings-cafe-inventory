const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// Serve static files for product images
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static(path.join(__dirname, '../wings-cafe-invetory-system/public/images')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/api/products', productRoutes);

// ADD SALES API ENDPOINT
app.get('/api/sales', (req, res) => {
    try {
        const salesDataPath = path.join(__dirname, 'sales.json');

        // Check if sales data file exists
        if (!fs.existsSync(salesDataPath)) {
            // Return empty array if no sales data exists yet
            return res.json([]);
        }

        // Read and return sales data
        const salesData = JSON.parse(fs.readFileSync(salesDataPath, 'utf8'));
        res.json(salesData);
    } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).json({ error: 'Failed to fetch sales data' });
    }
});

// POST endpoint to record a new sale
app.post('/api/sales', (req, res) => {
    try {
        const salesDataPath = path.join(__dirname, 'sales.json');
        const newSale = req.body;

        // Read existing sales data
        let salesData = [];
        if (fs.existsSync(salesDataPath)) {
            salesData = JSON.parse(fs.readFileSync(salesDataPath, 'utf8'));
        }

        // Add new sale with ID
        newSale.id = Date.now(); // Simple ID generation
        salesData.push(newSale);

        // Write back to file
        fs.writeFileSync(salesDataPath, JSON.stringify(salesData, null, 2));

        res.status(201).json(newSale);
    } catch (error) {
        console.error('Error recording sale:', error);
        res.status(500).json({ error: 'Failed to record sale' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});