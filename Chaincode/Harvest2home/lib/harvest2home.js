/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

import { Contract } from 'fabric-contract-api';

class Harvest2Home extends Contract {

    async itemExists(ctx, itemId) {
        const buffer = await ctx.stub.getState(itemId);
        return (!!buffer && buffer.length > 0);
    }

    async createFoodItem(ctx, itemId, name, quantity, price, farmerName) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'FarmerMSP') { 
            const exists = await this.itemExists(ctx, itemId);
            if (exists) {
                throw new Error(`The food item ${itemId} already exists`);
            }
            const asset = {
                name,
                quantity,
                price,
                status: 'Available', 
                ownedBy: farmerName,
                assetType: 'foodItem'
            };
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(itemId, buffer);
        } else {
            throw new Error(`User under the following MSP: ${mspID} cannot perform this action`);
        }
    }

    async readFoodItem(ctx, itemId) {
        const exists = await this.itemExists(ctx, itemId);
        if (!exists) {
            throw new Error(`The food item ${itemId} does not exist`);
        }
        const buffer = await ctx.stub.getState(itemId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }
}

export default Harvest2Home;
