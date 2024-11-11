const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "deliveryPartner",
    "harvest-channel",
    "Harvest2home",
    "HarvestContract",
    "deliverorder",
    "",
    "deliverOrder",
    "order1"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Product successfully created")
})