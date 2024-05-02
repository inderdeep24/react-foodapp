const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        // Validate email field
        if (!req.body.email) {
            return res.status(400).json({ error: 'Email field is required.' });
        }

        // Extract order data and date from the request
        let data = req.body.order_data;
        data.splice(0, 0, { Order_date: req.body.order_date });

        // Find an existing order by email
        let existingOrder = await Order.findOne({ email: req.body.email });

        if (existingOrder === null) {
            // If email doesn't exist in the Order collection, create a new order
            await Order.create({
                email: req.body.email,
                order_data: [data],
            });
            // Send a success response
            res.json({ success: true });
        } else {
            // If email exists, update the existing order with new data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            // Send a success response
            res.json({ success: true });
        }
    } catch (error) {
        // Log the error
        console.error(error.message);
        // Send an error response with a 500 status code and error message
        res.status(400).json({ error: 'Server Error: ' + error.message });
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});


module.exports = router;  
