const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "qualityAgency",
    "harvest-channel",
    "Harvest2home",
    "HarvestContract",
    "assigndelivery",
    "",
    "assignDeliveryAgent",
    "order1",
    "agent1"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Product successfully created")
})