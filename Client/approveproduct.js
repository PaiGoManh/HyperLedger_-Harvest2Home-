const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "qualityAgency",
    "harvest-channel",
    "Harvest2home",
    "harvestContract",
    "approveproduct",
    "",
    "approveProduct",
    "Prod01",
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Product successfully created")
})