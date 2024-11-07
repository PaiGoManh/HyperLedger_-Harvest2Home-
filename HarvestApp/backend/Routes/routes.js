const express = require("express");
const router = express.Router();
const { clientApplication } = require('./client')
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


// app.post('/api/instantiate', async (req, res, next) => {
//     try {
//         const contract = await getContract('farmer');
//         await contract.submitTransaction('instantiate');
//         res.status(200).send('Chaincode instantiated successfully.');
//     } catch (error) {
//         next(error);
//     }
//  });
 
router.post('/addProduct', async (req, res) => {
  try {
      const { name, category, quantity, price, owner } = req.body;

      if (!name || !category || !quantity || !price || !owner) {
          return res.status(400).json({
              success: false,
              message: "All fields are required.",
          });
      }

      let FarmerClient = new clientApplication();
      
      const result = await FarmerClient.submitTxn(
          "farmer",
          "harvest-channel",
          "Harvest2home",
          "HarvestContract",
          "addproduct",
          "",
          "addProduct",
          name,
          category,
          quantity,
          price,
          owner
      );

      console.log("Transaction result:", result);
      
      res.status(201).json({
          success: true,
          message: "Product added successfully!",
          data: result,
      });
  } catch (error) {
      console.error('Error in adding product:', error);
      res.status(500).json({
          success: false,
          message: "An error occurred while adding the product.",
          error: error.message,
      });
  }
});

 
 router.get('/products', async (req, res) => {
  try {
      const FarmerClient = new clientApplication();
      const result = await FarmerClient.submitTxn(
        "farmer",
        "harvest-channel",
        "Harvest2home",
        "HarvestContract",
        "getallproduct",
        "",
        "getAllProducts"
      );

      const decodedString = new TextDecoder().decode(result);
      const products = JSON.parse(decodedString);

      res.status(200).json(products); 
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: error.message });
  }
});

router.get('/productsforapproval', async (req, res) => {
  try {
      const AgencyClient = new clientApplication();
      const result = await AgencyClient.submitTxn(
        "qualityAgency",
        "harvest-channel",
        "Harvest2home",
        "HarvestContract",
        "getallproduct",
        "",
        "getAllProducts"
      );

      const decodedString = new TextDecoder().decode(result);
      const products = JSON.parse(decodedString);

      res.status(200).json(products); 
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: error.message });
  }
});


router.post('/approveProduct', async (req, res) => {
  const { productId } = req.body;
  try {
    const AgencyClient = new clientApplication();
    const result = await AgencyClient.submitTxn(
      "qualityAgency",
      "harvest-channel",
      "Harvest2home",
      "HarvestContract",
      "approveproduct",
      "",
      "approveProduct",
      productId,
    );
    console.log(new TextDecoder().decode(result));
    res.status(200).json({ message: "Product approved successfully" });
  } catch (error) {
    console.error('Error approving product:', error);
    res.status(500).json({ message: "Error approving product" });
  }
});

 
router.post('/rejectProduct', async (req, res) => {
    const { productId, comments } = req.body;
  
    try {
      const AgencyClient = new clientApplication();
      const result = await AgencyClient.submitTxn(
        "qualityAgency",
        "harvest-channel",
        "Harvest2home",
        "HarvestContract",
        "rejectproduct",
        "",
        "rejectProduct",
        productId,
        comments
      );
      console.log(new TextDecoder().decode(result));
      res.status(200).json({ message: 'Product rejected successfully' });
    } catch (error) {
      console.error('Error rejecting product:', error);
      res.status(500).json({ message: 'Error rejecting product' });
    }
  });

  router.get('/approvedProducts', async (req, res) => {
    try {
        const ConsumerClient = new clientApplication();
        const result = await ConsumerClient.submitTxn(
          "consumerAssosiation",
          "harvest-channel",
          "Harvest2home",
          "HarvestContract",
          "getallproduct",
          "",
          "getAllProducts"
        );
  
        const decodedString = new TextDecoder().decode(result);
        const products = JSON.parse(decodedString);
  
        res.status(200).json(products); 
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: error.message });
    }
  });

router.post('/placeOrder', async (req, res) => {
  try {
      const { productId, quantity } = req.body;
      const orderId = `ORDER-${Math.floor(1000 + Math.random() * 9000)}`;
      const userClient = new clientApplication();

      const result = await userClient.submitTxn(
        "consumerAssosiation",  
        "harvest-channel",      
        "Harvest2home",         
        "HarvestContract",      
        "placeorder",           
        "",                     
        "placeOrder",               
        orderId.toString(),          
        productId.toString(),        
        quantity.toString()        
      );

      if (!result || result.length === 0) {
          return res.status(200).json({ message: "Order placed successfully", orderId });
      }
      const decodedString = new TextDecoder().decode(result);
      const orderDetails = JSON.parse(decodedString);

      res.status(200).json({ message: "Order placed successfully", orderId: orderDetails.orderId });
  } catch (error) {
      console.error("Failed to place order:", error);
      res.status(500).json({ error: error.message });
  }
});

router.get('/orders', async (req, res) => {
  try {
      const ConsumerClient = new clientApplication();
      const result = await ConsumerClient.submitTxn(
        "consumerAssosiation",
        "harvest-channel",
        "Harvest2home",
        "HarvestContract",
        "getAllOrders",
      );

      const decodedString = new TextDecoder().decode(result);
      const orders = JSON.parse(decodedString);

      res.status(200).json(orders); 
  } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: error.message });
  }
});









// router.post('/mint', async (req, res) => {
//   const { recipient, amount } = req.body;
//   try {
//       const clientApp = new clientApplication();
//       const result = await clientApp.submitTxn(
//           'consumerAssosiation', // specify the org name
//           'harvest-channel',
//           'Harvest2home', // specify the channel name
//           'TokenERC20Contract', // chaincode name
//           '', // contract name, if not using default
//           'mint',
//           null, // no transient data needed
//           'mint', // transaction function name
//           recipient,
//           amount
//       );
//       res.status(200).json({ success: true, message: result });
//   } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//   }
// });


// router.post('/transfer', async (req, res) => {
//   const { sender, recipient, amount } = req.body;
//   try {
//       const clientApp = new clientApplication();
//       const result = await clientApp.submitTxn(
//         'consumerAssosiation', // specify the org name
//         'harvest-channel',
//         'Harvest2home', // specify the channel name
//         'TokenERC20Contract', // chaincode name
//           '', // contract name, if not using default
//           'transfer',
//           null, // no transient data needed
//           'transfer', // transaction function name
//           sender,
//           recipient,
//           amount
//       );
//       res.status(200).json({ success: true, message: result });
//   } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//   }
// });

 
//  router.put('/api/assignDeliveryAgent', async (req, res, next) => {
//     const { orderId, deliveryAgentId } = req.body;
//     try {
//         const contract = await getContract('qualityAgency');
//         await contract.submitTransaction('assignDeliveryAgent', orderId, deliveryAgentId);
//         res.status(200).send(`Delivery agent ${deliveryAgentId} assigned to order ${orderId}.`);
//     } catch (error) {
//         next(error);
//     }
//  });
 
//  router.get('/api/trackOrder/:orderId', async (req, res, next) => {
//     const { orderId } = req.params;
//     try {
//         const contract = await getContract('consumerAssosiation');
//         const result = await contract.evaluateTransaction('trackOrder', orderId);
//         res.json(JSON.parse(result.toString()));
//     } catch (error) {
//         next(error);
//     }
//  });
 
//  router.put('/api/deliverOrder/:orderId', async (req, res, next) => {
//     const { orderId } = req.params;
//     try {
//         const contract = await getContract('deliveryPartner');
//         await contract.submitTransaction('deliverOrder', orderId);
//         res.status(200).send(`Order ${orderId} delivered.`);
//     } catch (error) {
//         next(error);
//     }
//  });


module.exports = router;