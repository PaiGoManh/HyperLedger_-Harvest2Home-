const { EventListener} = require('./events')

let FarmerEvent = new EventListener();

FarmerEvent.BlockEventListener("farmer","harvest-channel");