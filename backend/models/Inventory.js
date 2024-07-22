import mongoose from 'mongoose';

// Define a schema to store dynamic fields
const inventorySchema = new mongoose.Schema({
  data: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

// Create the model from the schema
const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
