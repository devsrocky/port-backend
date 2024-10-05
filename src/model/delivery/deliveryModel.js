const  mongoose = require("mongoose");
const DataSchema = mongoose.Schema({

    UserEmail: {type: String},
    DeliveryStatus: {type: String, default: 'Waiting for accept'},
    DeliDescription: {type: String, maxLength: 250},
    ProjectTemplate: {type: String},
    OrderId: {type: mongoose.Schema.Types.ObjectId},
    createdDate: {type: Date, default: Date.now()}

}, {versionKey: false})

const DeliveryModel = mongoose.model('deliveries', DataSchema);
module.exports = DeliveryModel;