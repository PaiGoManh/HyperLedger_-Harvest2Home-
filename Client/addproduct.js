const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "farmer",
    "harvest-channel",
    "Harvest2home",
    "HarvestContract",
    "addproduct",
    "",
    "addProduct",
    "Tomato",
    "vegetable",
    "1",
    "30",
    "farmer4"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Product successfully created")
})