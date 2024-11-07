const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "consumerAssosiation",  
    "harvest-channel",      
    "Harvest2home",         
    "HarvestContract",      
    "placeorder",           
    "",                     
    "placeOrder",           
    "ORDER1234",            
    "Prod01",           
    "1"                    
).then(result => {
    const decodedString = new TextDecoder().decode(result);
    console.log(decodedString);
    console.log("Order successfully placed");
}).catch(error => {
    console.error("Failed to place order:", error);
});
