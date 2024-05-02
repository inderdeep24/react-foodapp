const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/gofoodmern';

// Define schema for 'food_items' collection
const foodItemSchema = new mongoose.Schema({
  // Define schema fields here
});  

// Define model for 'food_items' collection
const FoodItem = mongoose.model('FoodItem', foodItemSchema, 'food_items');

// Define model for 'foodcategory' collection
const FoodCategory = mongoose.model('FoodCategory', foodItemSchema, 'foodcategory');

// Function to connect to MongoDB
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

// Function to retrieve data from the 'food_items' collection
const getDataFromCollection = async () => {
  try {
    // Ensure MongoDB connection is established
    if (mongoose.connection.readyState !== 1) {
      await mongoDB();
    }  

    // Retrieve data using the Mongoose model
    const collectionData = await FoodItem.find({});

    return collectionData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const getDataFromcategory = async () => {
  try {
    // Ensure MongoDB connection is established
    if (mongoose.connection.readyState !== 1) {
      await mongoDB();
    }  

    // Retrieve data using the Mongoose model
    const collectionData = await FoodCategory.find({});

    return collectionData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

module.exports = { mongoDB, getDataFromCollection,getDataFromcategory };
