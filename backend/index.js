import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import config from './config.js';
import { SellingPartner } from 'amazon-sp-api';
import cors from 'cors';
import mongoose from 'mongoose';
import Inventory from './models/Inventory.js'; // Import the Inventory model

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to clean up JSON keys
function cleanKeys(data) {
  return data.map(item => {
    const cleanedItem = {};
    Object.keys(item).forEach(key => {
      const cleanKey = key.replace(/"/g, ''); // Remove all double quotes
      cleanedItem[cleanKey] = item[key].replace(/"/g, ''); // Remove all double quotes from values
    });
    return cleanedItem;
  });
}

// API endpoint to get inventory data
app.get('/api/inventory', async (req, res) => {
  try {
    const inventoryData = await Inventory.find().exec(); // Fetch data from MongoDB
    const page = parseInt(req.query.page) || 1;
    const pageSize = 6;
    const totalItems = inventoryData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedInventory = inventoryData.slice(startIndex, endIndex);

    res.json({
      inventory: paginatedInventory,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems
    });
  } catch (err) {
    res.status(500).send('Error fetching inventory data');
  }
});

// Serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Function to download the report and save to MongoDB
const order = async () => {
  try {
    const spClient = new SellingPartner(config);
    let res = await spClient.downloadReport({
      body: {
        reportType: process.env.REPORT_TYPE,
        marketplaceIds: [process.env.MARKET_PLACE_IDS],
        dataStartTime: "2020-01-01T00:00:00Z",
        dataEndTime: "2024-07-19T00:00:00Z"
      },
      version: "2021-06-30",
      interval: 5000,
      download: {
        json: true,
        file: "./reports/FBA_REIMBURSEMENTS_DATA.json"
      }
    });
    console.log("Report download response:", res);

    // Read the downloaded report file
    const data = fs.readFileSync('./reports/FBA_REIMBURSEMENTS_DATA.json', 'utf8');
    const inventory = JSON.parse(data);
    const cleanedInventory = cleanKeys(inventory);

    // Save data to MongoDB
    await Inventory.insertMany(cleanedInventory.map(item => ({ data: item })));
    console.log("Data saved to MongoDB");
  } catch (e) {
    console.error("Error downloading or saving report:", e);
    console.error("Error details:", e.response?.data);
  }
};

// Run the order function to download the report
order();

// Start the Express server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});        
