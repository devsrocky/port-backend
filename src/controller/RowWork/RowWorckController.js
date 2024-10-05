const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const DataModel = require('../../model/rowWork/RowWordModel')
const UserModel = require('../../model/user/UserModel')
const OrderModel = require('../../model/order/OrderModel')
const CommonCreateService = require('../../service/common/CommonCreateService')
const CommonListJoinService = require('../../service/common/CommonListJoinService')
const updateAdministratorService = require('../../service/common/updateAdministratorService');
const CheckAssociation = require('../../service/common/CheckAssociation');

exports.createrowWordk = async (req, res) => {
    let data = await CommonCreateService(req, DataModel)
    res.status(200).json(data)
}
exports.updaterowWork = async (req, res) => {
    let data = await updateAdministratorService(req, DataModel, UserModel)
    res.status(200).json(data)
}

exports.RowWorkList = async (req, res) => {

    let searchRegex = {"$regex": req.params.keyword, "$options": "i"}
    let SearchKeywords = {$or: [{RowWorKTitle: searchRegex}, {RowWorKPrice: searchRegex}, {'Niche.Name': searchRegex}]}
    let JoinStage = {$lookup: {from: 'niches', localField: 'NicheId', foreignField: '_id', as: 'Niche'}}

    let data = await CommonListJoinService(req, DataModel, SearchKeywords, JoinStage)
    res.status(200).json(data)

}

exports.deleteRowWork = async (req, res) => {

    let DeleteId = new ObjectId(req.params.DeleteId)
    let associated = await CheckAssociation({RowWorkId: DeleteId}, OrderModel)
    if(associated){
        res.status(200).json({status: 'associated', message: 'The RowWork is associated with order'})
    }else{
        let DeletedId = await DataModel.deleteOne({_id: DeleteId})
        res.status(200).json({status: 'success', message: 'The RowWork has been deleted', data: DeletedId})
    }
}