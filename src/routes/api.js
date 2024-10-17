const express = require('express')
const router = express.Router()

// Auth-verfiy controller
const AuthVerification = require('../middleware/AuthVerification')

// Controllers
const ThemeController = require('../controller/Theme/ThemeController')
const UserController = require('../controller/user/userController')
const ReviewController = require('../controller/review/ReviewController')
const appointmentController = require('../controller/appointment/appointmentController')
const RowWorckController = require('../controller/RowWork/RowWorckController')
const orderController = require('../controller/order/orderController')
const DeliveryController = require('../controller/delivery/deliveryController')

// Local path
router.post('/CreateHeroContent', AuthVerification, ThemeController.CreateHeroContent)
router.post('/updateHeroContent/:id', AuthVerification, ThemeController.updateHeroContent)
router.get('/listHeroContent/:pageNo/:perPage/:keyword', AuthVerification, ThemeController.listHeroContent)
router.get('/HeroContentDetails/:id', ThemeController.HeroContentDetails)
router.get('/deleteHeroContent/:DeleteId',AuthVerification, ThemeController.deleteHeroContent)



router.post('/CreateNiche', AuthVerification, ThemeController.CreateNiche)
router.post('/updateNiche/:id', AuthVerification, ThemeController.updateNiche)
router.get('/listNiches/:pageNo/:perPage/:keyword', ThemeController.listNiches)
router.get('/deleteNich/:DeleteId', AuthVerification, ThemeController.deleteNich)
router.get('/NicheDetails/:id', AuthVerification, ThemeController.NicheDetails)

router.post('/CreatePortfolio', AuthVerification, ThemeController.CreatePortfolio)
router.post('/updatePortfolio/:id', AuthVerification, ThemeController.updatePortfolio)
router.get('/listPortfolio/:pageNo/:PerPage/:keyword', ThemeController.listPortfolio)
router.get('/portfolioListByNiche/:tablink', ThemeController.listByNiche)
router.get('/deletePortfolio/:DeleteId',AuthVerification, ThemeController.deletePortfolio)
router.get('/PortfolioDetails/:id', ThemeController.PortfolioDetails)



// Reviews path
router.post('/CreateReview', AuthVerification, ReviewController.CreateReview)
router.post('/updateReview/:id', AuthVerification, ReviewController.updateReview)
router.get('/listOfReview/:pageNo/:PerPage/:keyword', ReviewController.listOfReview)
router.get('/reviewListByNich/:tablink', ReviewController.reviewListByNich)
router.get('/DeleteReview/:DeleteId', AuthVerification, ReviewController.DeleteReview)


// Appointment path
router.post('/CreateAppointment', appointmentController.CreateAppointment)
router.post('/updateAppointment/:id', AuthVerification, appointmentController.updateAppointment)
router.get('/ListOfAppointment/:pageNo/:perPage/:keyword', AuthVerification, appointmentController.ListOfAppointment)
router.get('/deleteAppointment/:DeleteId', AuthVerification, appointmentController.deleteAppointment)



// user path
router.post('/userRegistration', UserController.userRegistration)
router.get('/userEmailVerification/:email', UserController.userEmailVerification)
router.post('/userProfileVerification/:email/:otp', UserController.userProfileVerification)
router.get('/userList/:pageNo/:perPage/:keyword', UserController.userList)
router.get('/userListByRole/:RoleText', UserController.userListByRole)
router.get('/deleteUserAccount/:DeleteId', AuthVerification, UserController.deleteUserAccount)

router.post('/userPassReset/:email/:otp', UserController.userPassReset)
router.post('/userLogin', UserController.userLogin)
router.post('/userUpdate', AuthVerification, UserController.userUpdate)
router.get('/userProfileDetails',AuthVerification,  UserController.userProfileDetails)




// RowWork path
router.post('/createrowWordk', AuthVerification, RowWorckController.createrowWordk)
router.post('/updaterowWork/:id', AuthVerification, RowWorckController.updaterowWork)
router.get('/RowWorkList/:pageNo/:PerPage/:keyword', RowWorckController.RowWorkList)
router.get('/deleteRowWork/:DeleteId', AuthVerification, RowWorckController.deleteRowWork)

// Order path
router.post('/createOrder', AuthVerification, orderController.createOrder)
router.post('/updateOrder/:id', AuthVerification, orderController.updateOrder)
router.get('/OrderList/:pageNo/:PerPage/:keyword', orderController.OrderList)
router.get('/deleteOrder/:DeleteId', AuthVerification, orderController.deleteOrder)
router.get('/orderListByUser', AuthVerification, orderController.orderListByUser)

// Delivery path
router.post('/createDelivery', AuthVerification, DeliveryController.createDelivery)
router.post('/updateDelivery/:id', AuthVerification, DeliveryController.updateDelivery)
router.get('/listOfDelivery/:pageNo/:PerPage/:keyword', AuthVerification, DeliveryController.listOfDelivery)
router.get('/deleteDelivery/:DeleteId', AuthVerification, DeliveryController.deleteDelivery)


// export module
module.exports = router;