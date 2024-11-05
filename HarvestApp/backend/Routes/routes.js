const express = require("express");
const router = express.Router();
const { clientApplication } = require('./client')


// app.post('/api/instantiate', async (req, res, next) => {
//     try {
//         const contract = await getContract('farmer');
//         await contract.submitTransaction('instantiate');
//         res.status(200).send('Chaincode instantiated successfully.');
//     } catch (error) {
//         next(error);
//     }
//  });
 
router.post('/api/addProduct', async (req, res) => {
    try {
        const { productId, name, category, quantity, price, owner } = req.body;
        let FarmerClient = new clientApplication();
        const result = await FarmerClient.submitTxn(
            "farmer",
            "harvest-channel",
            "Harvest2home",
            "harvestContract",
            "addproduct",
            "",
            "addProduct",
            productId,
            name,
            category,
            quantity,
            price,
            owner,
            
            
        );
        res.status(201).json({
            success: true,
            message: "Product added successfully!",
            data: { result },
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: "Please check the credentials",
            data: { error },
          });
        }
 });
 
//  router.get('/api/products', async (req, res, next) => {
//     try {
//         const contract = await getContract('consumerAssosiation');
//         const result = await contract.evaluateTransaction('getAllProducts');
//         res.json(JSON.parse(result.toString()));
//     } catch (error) {
//         next(error);
//     }
//  });
 
//  router.put('/api/approveProduct/:productId', async (req, res, next) => {
//     const { productId } = req.params;
//     try {
//         const contract = await getContract('qualityAgency');
//         await contract.submitTransaction('approveProduct', productId);
//         res.status(200).send(`Product ${productId} approved.`);
//     } catch (error) {
//         next(error);
//     }
//  });
 
//  router.put('/api/rejectProduct/:productId', async (req, res, next) => {
//     const { productId } = req.params;
//     const { comments } = req.body;
//     try {
//         const contract = await getContract('qualityAgency');
//         await contract.submitTransaction('rejectProduct', productId, comments);
//         res.status(200).send(`Product ${productId} rejected.`);
//     } catch (error) {
//         next(error);
//     }
//  });
 
//  router.post('/api/placeOrder', async (req, res, next) => {
//     const { orderId, productId, quantity } = req.body;
//     try {
//         const contract = await getContract('consumerAssosiation');
//         await contract.submitTransaction('placeOrder', orderId, productId, quantity);
//         res.status(200).send(`Order ${orderId} placed.`);
//     } catch (error) {
//         next(error);
//     }
//  });
 
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