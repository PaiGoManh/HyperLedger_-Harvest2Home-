// const { FileSystemWallet, Gateway } = require('fabric-network');
// const path = require('path');

// class clientApplication {
//   constructor() {
//     this.walletPath = path.join(process.cwd(), 'wallet');
//     this.gateway = new Gateway();
//     this.wallet = new FileSystemWallet(this.walletPath);
//   }

//   async placeOrder(orderId, productId, quantity) {
//     try {
//       const network = await this.connectToNetwork();
//       const contract = network.getContract('HarvestContract');

//       const mspID = await this.getMSPID();

//       // Check if the client is authorized to place an order
//       if (mspID !== 'ConsumersAssociationMSP') {
//         throw new Error("Unauthorized: Only consumers can place orders.");
//       }

//       // Submit the transaction to place the order
//       const result = await contract.submitTransaction(
//         'placeOrder', 
//         orderId, 
//         productId, 
//         quantity
//       );

//       // Decode the result (if any) and return the response
//       const decodedString = new TextDecoder().decode(result);
//       console.log(`Order placed successfully: ${decodedString}`);
//       return JSON.parse(decodedString);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       throw new Error(error.message);
//     } finally {
//       await this.gateway.disconnect();
//     }
//   }

//   async connectToNetwork() {
//     const identity = await this.wallet.get('consumerIdentity');
//     if (!identity) {
//       throw new Error('No identity found in the wallet for consumer');
//     }

//     await this.gateway.connect(path.join(process.cwd(), 'connection-profile/network-connection-profile.json'), {
//       identity: 'consumerIdentity',
//       wallet: this.wallet,
//       discovery: { enabled: true, asLocalhost: true }
//     });

//     const network = await this.gateway.getNetwork('harvest-channel');
//     return network;
//   }

//   async getMSPID() {
//     const identity = await this.wallet.get('consumerIdentity');
//     return identity ? identity.mspId : '';
//   }
// }

// module.exports = clientApplication;
