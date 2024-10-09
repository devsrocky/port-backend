const DataModel = require('../../model/user/UserModel')
const OTPModel = require('../../model/otp/OTPModel')
const userUpdateService = require('../../service/user/UpdateUser')
const userRegistrationService = require('../../service/user/userRegistrationService')
const userOTPVerificationService = require('../../service/user/userOTPVerificationService')
const userLoginService = require('../../service/user/userLoginService')
const CommonEmailVerifyService = require('../../service/common/CommonEmailVerifyService')


exports.userRegistration = async (req, res) => {
    let data = await userRegistrationService(req, DataModel)
    res.status(200).json(data)
}

exports.userEmailVerification =  async (req, res) => {
    let data = await CommonEmailVerifyService(req, DataModel, OTPModel)
    res.status(200).json(data)
}

exports.userProfileVerification = async (req, res) => {
    let data = await userOTPVerificationService(req, DataModel, OTPModel)
    let UserEmail = req.params.email;
    if(data === true){
        await OTPModel.deleteOne({UserEmail: UserEmail, UserOTP: 'x-end', OTPStatus: 'verified'})
        await DataModel.updateOne({email: UserEmail}, {profileStatus: 'approved'})
        res.status(200).json({status: 'success', message: 'Your account has been approved'})
    }else{
        res.status(200).json({status: 'failed', message: 'It seems to be you aren\'t authorize user'})
    }
}

exports.userLogin = async (req, res) => {
    let data = await userLoginService(req, DataModel)
    if(data.status === "success"){
        let CookieOption = {
            expires: new Date(Date.now() + 24*60*60*1000),
            httpOnly: false
        }
        res.cookie('token', data['token'], CookieOption)
        res.status(200).json(data)
    }else{
        res.status(200).json(data)
    }
}

exports.userUpdate = async (req, res) => {
    let data = await userUpdateService(req, DataModel)
    res.status(200).json(data)
}

exports.userPassReset = async (req, res) => {
    let data = await userOTPVerificationService(req, DataModel, OTPModel)
    let UserEmail = req.params.email;
    let NewPassword = req.body['password']
    if(data === true){
        await OTPModel.deleteOne({UserEmail: UserEmail, UserOTP: 'x-end', OTPStatus: 'verified'})
        await DataModel.updateOne({password: NewPassword})
        res.status(200).json({status: 'success', message: 'New password saved'})
    }else{
        res.status(200).json({status: 'failed', message: 'It seems to be you aren\'t authorize user'})
    }

}