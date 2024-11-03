const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "consumerAssosiation",
    "harvest-channel",
    "Harvest2home",
    "harvestContract",
    "getproduct",
    "",
    "getProduct",
    "Prod01" 
).then(result => {
    console.log("Product data:", JSON.parse(new TextDecoder().decode(result)));
}).catch(error => {
    console.error("Failed to retrieve product:", error);
});

