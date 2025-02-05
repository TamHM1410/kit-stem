const asyncHandler = require("express-async-handler");

const {getAnalysisDetail}=require('../Repository/analysis-repo')

class OverviewClass {
    static get_analysis=asyncHandler(async()=>{
        return await getAnalysisDetail(2024)
    })

}


module.exports=OverviewClass