const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "qualityAgency",
    "harvest-channel",
    "Harvest2home",
    "harvestContract",
    "rejectproduct",
    "",
    "rejectProduct",
    "Prod03",
    "not met the requirements",
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Product successfully created")
})