const express = require('express');
const app = express();
const { mongoDB, getDataFromCollection,getDataFromcategory } = require('./db'); // Import mongoDB and getDataFromCollection as named exports

// Now you can call the mongoDB function to establish the connection
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3001")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})
  
mongoDB();
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
// Now you can call the getDataFromCollection function to retrieve data from a collection
getDataFromCollection('food_items') // Replace 'yourCollectionName' with the actual name of your collection
  .then(data => {
    
    global.food_items = data;
    // console.log(global.food_items)
  })
  .catch(error => {
    console.error('Error:', error);    
  });  

// getting data from food category collection
getDataFromcategory('foodcategory') // Replace 'yourCollectionName' with the actual name of your collection
  .then(data => {
    // console.log(data)
    global.foodcategory = data;
    // console.log(global.food_items)
  })
  .catch(error => {
    console.error('Error:', error);    
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
