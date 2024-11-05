'use strict';

const { Contract } = require('fabric-contract-api');

class HarvestContract extends Contract {

    async instantiate(ctx) {
        console.info('Instantiating the chaincode');
        await this.initLedger(ctx);
        console.info('Chaincode instantiated successfully');
    }

    async initLedger(ctx) {
        console.info('Initializing Ledger with Default Consumer Balance');
        const consumers = [
            {
                consumerId: 'CONSUMER-1',
                name: 'John Doe',
                balance: 1000
            }
        ];

        for (const consumer of consumers) {
            await ctx.stub.putState(consumer.consumerId, Buffer.from(JSON.stringify(consumer)));
            console.info(`Added consumer ${consumer.consumerId} to the ledger.`);
        }

        console.info('Ledger initialization complete.');
    }

    async productExists(ctx, productId) {
        const product = await ctx.stub.getState(productId);
        return (!!product && product.length > 0);
    }

    async addProduct(ctx, productId, name, category, quantity, price, owner) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID !== 'FarmerMSP') {
            throw new Error("Unauthorized: Only farmers can add products.");
        }
        if (category !== 'fruit' && category !== 'vegetable') {
            throw new Error("Invalid category: Only fruits and vegetables allowed.");
        }

        const exists = await this.productExists(ctx, productId);
        if (exists) {
            throw new Error(`Product ${productId} already exists`);
        }

        const product = {
            name,
            category,
            quantity,
            price,
            owner,
            status: 'Pending Approval'
        };
        await ctx.stub.putState(productId, Buffer.from(JSON.stringify(product)));
    }

    async getAllProducts(ctx) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID !== 'ConsumersAssociationMSP') {
            throw new Error("Unauthorized: Only consumers can view products.");
        }
        const iterator = await ctx.stub.getStateByRange('', '');
        const allProducts = [];

        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                const product = JSON.parse(res.value.value.toString('utf8'));
                allProducts.push(product);
            }
            if (res.done) {
                await iterator.close();
                break;
            }
        }

        return JSON.stringify(allProducts);
    }

    async getProduct(ctx, productId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID !== 'ConsumersAssociationMSP') {
            throw new Error("Unauthorized: Only consumers can view products.");
        }

        const exists = await this.productExists(ctx, productId);
        if (!exists) {
            throw new Error(`Product ${productId} does not exist`);
        }
        const productData = await ctx.stub.getState(productId);
        return JSON.parse(productData.toString());
    }

    async approveProduct(ctx, productId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID !== 'QualityAssuranceAgencyMSP') {
            throw new Error("Unauthorized: Only QA can approve products.");
        }

        const exists = await this.productExists(ctx, productId);
        if (!exists) {
            throw new Error(`Product ${productId} does not exist`);
        }

        const product = JSON.parse((await ctx.stub.getState(productId)).toString());
        product.status = 'Approved';
        await ctx.stub.putState(productId, Buffer.from(JSON.stringify(product)));
    }

    async rejectProduct(ctx, productId, comments) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID !== 'QualityAssuranceAgencyMSP') {
            throw new Error("Unauthorized: Only QA can reject products.");
        }

        const exists = await this.productExists(ctx, productId);
        if (!exists) {
            throw new Error(`Product ${productId} does not exist`);
        }

        const product = JSON.parse((await ctx.stub.getState(productId)).toString());
        product.status = 'Rejected';
        product.comments = comments;
        await ctx.stub.putState(productId, Buffer.from(JSON.stringify(product)));
    }

    async placeOrder(ctx, orderId, productId, quantity) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID !== 'ConsumersAssociationMSP') {
            throw new Error("Unauthorized: Only consumers can place orders.");
        }

        const exists = await this.productExists(ctx, productId);
        if (!exists) {
            throw new Error(`Product ${productId} does not exist`);
        }

        const product = JSON.parse((await ctx.stub.getState(productId)).toString());
        if (product.status !== 'Approved') {
            throw new Error(`Product ${productId} is not available for order`);
        }
        if (product.quantity < quantity) {
            throw new Error(`Not enough stock for product ${productId}`);
        }

        const orderAmount = product.price * quantity;
        const consumerId = `CONSUMER-${Math.floor(100000 + Math.random() * 900000)}`;
        const farmerId = product.owner;

        await this.transferFunds(ctx, consumerId, farmerId, orderAmount);

        const order = {
            orderId,
            productId,
            quantity,
            consumerId,
            farmerId,
            amount: orderAmount,
            status: 'Pending Delivery',
            deliveryAgentId: null
        };
        product.quantity -= quantity;
        await ctx.stub.putState(productId, Buffer.from(JSON.stringify(product)));
        await ctx.stub.putState(orderId, Buffer.from(JSON.stringify(order)));
    }

    async assignDeliveryAgent(ctx, orderId, deliveryAgentId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID !== 'QualityAssuranceAgencyMSP') {
            throw new Error("Unauthorized: Only QA can assign delivery agents.");
        }

        const orderData = await ctx.stub.getState(orderId);
        if (!orderData || orderData.length === 0) {
            throw new Error(`Order ${orderId} does not exist`);
        }

        const order = JSON.parse(orderData.toString());
        if (order.status !== 'Pending Delivery') {
            throw new Error(`Order ${orderId} is not in the correct status to assign a delivery agent`);
        }

        order.deliveryAgentId = deliveryAgentId;
        order.status = 'Out for Delivery';
        await ctx.stub.putState(orderId, Buffer.from(JSON.stringify(order)));
    }

    async trackOrder(ctx, orderId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID !== 'ConsumersAssociationMSP') {
            throw new Error("Unauthorized: Only consumers can track orders.");
        }

        const orderData = await ctx.stub.getState(orderId);
        if (!orderData || orderData.length === 0) {
            throw new Error(`Order ${orderId} does not exist`);
        }

        const order = JSON.parse(orderData.toString());
        return order;
    }

    async deliverOrder(ctx, orderId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID !== 'DeliveryPartnerMSP') {
            throw new Error("Unauthorized: Only delivery partners can update deliveries.");
        }

        const orderData = await ctx.stub.getState(orderId);
        if (!orderData || orderData.length === 0) {
            throw new Error(`Order ${orderId} does not exist`);
        }

        const order = JSON.parse(orderData.toString());
        if (order.status !== 'Out for Delivery') {
            throw new Error(`Order ${orderId} is not out for delivery`);
        }

        order.status = 'Delivered';
        await ctx.stub.putState(orderId, Buffer.from(JSON.stringify(order)));

        await this.rewardTokens(ctx, order.deliveryAgentId, 10);
        await this.payDeliveryAgent(ctx, 'QualityAssuranceAgencyMSP', order.deliveryAgentId, 20);
    }

    async rewardTokens(ctx, userId, amount) {
        let userData = await ctx.stub.getState(userId);
        let user = {};
        if (userData && userData.length > 0) {
            user = JSON.parse(userData.toString());
        }
        user.tokens = (user.tokens || 0) + amount;
        await ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
    }

    async transferFunds(ctx, fromId, toId, amount) {
        let fromData = await ctx.stub.getState(fromId);
        let toData = await ctx.stub.getState(toId);

        let fromAccount = fromData && fromData.length > 0 ? JSON.parse(fromData.toString()) : {};
        let toAccount = toData && toData.length > 0 ? JSON.parse(toData.toString()) : {};

        if ((fromAccount.balance || 0) < amount) {
            throw new Error(`Insufficient funds for ${fromId}`);
        }

        fromAccount.balance = (fromAccount.balance || 0) - amount;
        toAccount.balance = (toAccount.balance || 0) + amount;

        await ctx.stub.putState(fromId, Buffer.from(JSON.stringify(fromAccount)));
        await ctx.stub.putState(toId, Buffer.from(JSON.stringify(toAccount)));
    }

    async payDeliveryAgent(ctx, fromId, deliveryAgentId, amount) {
        await this.transferFunds(ctx, fromId, deliveryAgentId, amount);
    }
}

module.exports = HarvestContract;
