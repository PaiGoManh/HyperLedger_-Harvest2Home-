const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "farmer",
    "harvest-channel",
    "Harvest2home",
    "harvestContract",
    "addproduct",
    "",
    "addProduct",
    "Prod03",
    "Tomato",
    "vegetable",
    "1",
    "30",
    "farmer4"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Product successfully created")
})