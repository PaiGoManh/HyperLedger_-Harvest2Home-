let profile = {
    farmer: {
        "cryptoPath": "../../Harvest2Home/organizations/peerOrganizations/farmer.harvest2home.com", 
		"keyDirectoryPath": "../../Harvest2Home/organizations/peerOrganizations/farmer.harvest2home.com/users/User1@farmer.harvest2home.com/msp/keystore/",
        "certPath":  "../../Harvest2Home/organizations/peerOrganizations/farmer.harvest2home.com/users/User1@farmer.harvest2home.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Harvest2Home/organizations/peerOrganizations/farmer.harvest2home.com/peers/peer0.farmer.harvest2home.com/tls/ca.crt",
		"peerEndpoint": "localhost:7051",
		"peerHostAlias":  "peer0.farmer.harvest2home.com",
        "mspId": "FarmerMSP"
    },
    qualityAgency: {
        "cryptoPath": "../../Harvest2Home/organizations/peerOrganizations/quality-assurance-agency.harvest2home.com", 
		"keyDirectoryPath": "../../Harvest2Home/organizations/peerOrganizations/quality-assurance-agency.harvest2home.com/users/User1@quality-assurance-agency.harvest2home.com/msp/keystore/",
        "certPath":     "../../Harvest2Home/organizations/peerOrganizations/quality-assurance-agency.harvest2home.com/users/User1@quality-assurance-agency.harvest2home.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Harvest2Home/organizations/peerOrganizations/quality-assurance-agency.harvest2home.com/peers/peer0.quality-assurance-agency.harvest2home.com/tls/ca.crt",
		"peerEndpoint": "localhost:12051",
		"peerHostAlias":  "peer0.quality-assurance-agency.harvest2home.com",
        "mspId": "QualityAssuranceAgencyMSP"
    },
    consumerAssosiation: {
        "cryptoPath": "../../Harvest2Home/organizations/peerOrganizations/consumer-association.harvest2home.com", 
		"keyDirectoryPath": "../../Harvest2Home/organizations/peerOrganizations/consumer-association.harvest2home.com/users/User1@consumer-association.harvest2home.com/msp/keystore/",
        "certPath":     "../../Harvest2Home/organizations/peerOrganizations/consumer-association.harvest2home.com/users/User1@consumer-association.harvest2home.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Harvest2Home/organizations/peerOrganizations/consumer-association.harvest2home.com/peers/peer0.consumer-association.harvest2home.com/tls/ca.crt",
		"peerEndpoint": "localhost:10051",
		"peerHostAlias":  "peer0.consumer-association.harvest2home.com",
        "mspId": "ConsumersAssociationMSP"
    },
    deliveryPartner: {
        "cryptoPath": "../../Harvest2Home/organizations/peerOrganizations/delivery-partner.harvest2home.com", 
		"keyDirectoryPath": "../../Harvest2Home/organizations/peerOrganizations/delivery-partner.harvest2home.com/users/User1@delivery-partner.harvest2home.com/msp/keystore/",
        "certPath":     "../../Harvest2Home/organizations/peerOrganizations/delivery-partner.harvest2home.com/users/User1@delivery-partner.harvest2home.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Harvest2Home/organizations/peerOrganizations/delivery-partner.harvest2home.com/peers/peer0.delivery-partner.harvest2home.com/tls/ca.crt",
		"peerEndpoint": "localhost:9051",
		"peerHostAlias":  "peer0.delivery-partner.harvest2home.com",
        "mspId": "DeliverypartnerMSP"
    }
}
module.exports = { profile }