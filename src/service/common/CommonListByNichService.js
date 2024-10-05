const  mongoose= require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const CommonListByNichService = async (Request, PortfolioModel) => {
    try{
        let tablink = new ObjectId(Request.params.tablink);
        let data = await PortfolioModel.aggregate([
            {
                $facet: {
                    Total: [{$count: 'Total'}],
                    Rows: [
                        {$match: {NicheId: tablink}}
                    ]
                }
            }
        ])
        return {status: 'success', data: data}
    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}
module.exports = CommonListByNichService;