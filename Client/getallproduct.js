const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "consumerAssosiation",
    "harvest-channel",
    "Harvest2home",
    "harvestContract",
    "getallproduct",
    "",
    "getAllProducts"
).then(result => {
    if (result) {
        // Decode the Uint8Array to a string
        const decodedString = new TextDecoder().decode(result);
    
        // Parse the string as JSON
        const jsonObject = JSON.parse(decodedString);
        
        console.log("Product details:");
        console.log(jsonObject);
    } else {
        console.log("No result returned.");
    }
}).catch(error => {
    console.error("Error fetching products:", error);
});
