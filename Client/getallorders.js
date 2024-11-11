const { clientApplication } = require('./client');

let ConsumerClient = new clientApplication();
ConsumerClient.submitTxn(
    "consumerAssosiation",
    "harvest-channel",
    "Harvest2home",
    "HarvestContract",
    "getallorders",
    "",
    "getAllOrders"
).then(result => {
    if (result) {
        // Decode the Uint8Array to a string
        const decodedString = new TextDecoder().decode(result);
    
        // Parse the string as JSON
        const jsonObject = JSON.parse(decodedString);
        
        console.log("Order details:");
        console.log(jsonObject);
    } else {
        console.log("No result returned.");
    }
}).catch(error => {
    console.error("Error fetching orders:", error);
});
