const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
const DataModel = require('../../model/order/OrderModel');
const UserModel = require('../../model/user/UserModel');
const deliveryModel = require('../../model/delivery/deliveryModel');
const CheckAssociation = require('../../service/common/CheckAssociation');
const CommonListJoinService = require('../../service/common/CommonListJoinService');
const CommonUpdateService = require('../../service/common/CommonUpdateService');
const orderCreateService = require('../../service/order/orderCreateService');


exports.createOrder = async (req, res) => {
    function generateRandomCode (){
        let prefix = '#RO'
        let randomDigit = Math.floor(1000000000 + Math.random() * 9000000000)
        return prefix + randomDigit.toString();
    }
    let OrderNumber = generateRandomCode()
    let data = await orderCreateService(req, DataModel, OrderNumber)
    res.status(200).json(data)
}

exports.updateOrder = async (req, res) => {
    let data = await CommonUpdateService(req, DataModel, UserModel)
    res.status(200).json(data)
}

exports.OrderList = async (req, res) => {

    let SearchRegex = {"$regex": req.params.keyword, "$options": 'i'}
    let SearchKeywords = {$or: [{OrderTitle: SearchRegex}, {OrderPrice: SearchRegex}, {OrderStatus: SearchRegex}, {OrderNumber: SearchRegex}, {'RowWork.RowWorKTitle': SearchRegex}]}
    let JoinStage = {$lookup: {from: 'rowworks', localField: 'RowWorkId', foreignField: '_id', as: 'RowWork'}}

    let data = await CommonListJoinService(req, DataModel, SearchKeywords, JoinStage)
    res.status(200).json(data)

}

exports.deleteOrder = async (req, res) => {

    let DeleteId = new ObjectId(req.params.DeleteId);
    let associated = await CheckAssociation({OrderId: DeleteId}, deliveryModel)
    if(associated){
        res.status(200).json({status: 'associated', message: 'The Order associated with delivery'})
    }else{
        let deleted = await DataModel.deleteOne({_id: DeleteId})
        res.status(200).json({status: 'success', message: 'The order has been deleted', data: deleted})
    }
}