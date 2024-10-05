const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
const ReviewModel = require("../../model/reviews/ReviewModel")
const UserModel = require("../../model/user/UserModel")
const CommonListJoinProjectionService = require("../../service/common/CommonListJoinProjectionService")
const CommonUpdateService = require("../../service/common/CommonUpdateService")
const ReviewService = require("../../service/review/ReviewService");
const CommonDeleteByAdminService = require("../../service/common/CommonDeleteByAdminService");

exports.CreateReview = async (req, res) => {
    let data = await ReviewService(req, ReviewModel)
    res.status(200).json(data)
}

exports.updateReview = async (req, res) => {
    let data = await CommonUpdateService(req, ReviewModel, UserModel)
    res.status(200).json(data)
}

exports.listOfReview = async (req, res) => {
    try{


        let SearchRegex = {"$regex": req.params.keyword, "$options": "i"}
        let SearchKeywords = {$or: [{StarCommunicate: SearchRegex}, {StarRecomend: SearchRegex}, {StarService: SearchRegex}, {'User.country': SearchRegex}]}

        let JoinStage = {$lookup: {from: 'users', localField: 'UserId', foreignField: '_id', as: 'User'}}

        let Project = {$project: {_id: 1, StarCommunicate: 1, StarRecomend: 1, StarService: 1,createdDate: 1, 'User.fullName': 1, 'User.country': 1, 'User.userPhoto': 1}}

        let data = await CommonListJoinProjectionService(req, SearchKeywords, ReviewModel, JoinStage, Project)
        res.status(200).json(data)
        
    }catch(err){
        res.status(200).json({status: 'failed', data: err.toString()})
    }
}

exports.DeleteReview = async (req, res) => {
    let data = await CommonDeleteByAdminService(req, ReviewModel, UserModel)
    res.status(200).json(data)
}