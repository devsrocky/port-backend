const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const DeliveryModel = require('../../model/delivery/deliveryModel')
const UserModel = require('../../model/user/UserModel')
const OrderModel = require('../../model/order/OrderModel')
const CommonCreateByAdminService = require("../../service/common/CommonCreateByAdminService");
const CommonListJoinProjectionService = require('../../service/common/CommonListJoinProjectionService');
const DeliveryService = require('../../service/delivery/DeliveryService');
const { json } = require('body-parser');
const CommonDeleteByAdminService = require('../../service/common/CommonDeleteByAdminService');

exports.createDelivery = async (req, res) => {
    let data = await CommonCreateByAdminService(req, DeliveryModel, UserModel)
    res.status(200).json(data)
}

exports.updateDelivery = async (req, res) => {
    let UserDetails = JSON.parse(req.headers['UserDetails'])
    let data = await DeliveryService(req, DeliveryModel, UserModel, UserDetails)
    let Delivery = await DeliveryModel.aggregate([
        {$match: {_id: new ObjectId(req.params.id)}}
    ])
    if(data === true){

        await OrderModel.updateOne({_id: Delivery[0]['OrderId']}, {OrderStatus: 'Completed'})
        res.status(200).json({status: 'success', message: 'Thank you!'})

    }else{
        res.status(200).json(data)
    }
}

exports.listOfDelivery = async (req, res) => {

    let SearchRegex = {"$regex": req.params.keyword, "$options": "i"}
    let SearchKeywords = {$or: [{DeliveryStatus: SearchRegex}]}
    let JoinStage = {$lookup: {from: 'orders', localField: 'OrderId', foreignField: '_id', as: 'Order'}}
    let Project = {$project: {_id: 1, UserEmail: 1, DeliveryStatus: 1, DeliDescription: 1, ProjectTemplate: 1, 'Order._id': 1, 'Order.OrderTitle': 1, 'Order.OrderPrice': 1,'Order.OrderNumber': 1}}

    let data = await CommonListJoinProjectionService(req, SearchKeywords, DeliveryModel, JoinStage, Project)
    res.status(200).json(data)
}

exports.deleteDelivery = async (req, res) => {
    let data = await CommonDeleteByAdminService(req, DeliveryModel, UserModel)
    res.status(200).json(data)
}