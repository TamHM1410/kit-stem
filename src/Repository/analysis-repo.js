const user_model=require('../models/user-model')
const order_model_detail=require('../models/order-detail-model')
const order_model=require('../models/order-model')


const getAnalysisDetail = async (year) => {
    try {
        const [userList, totalCustomer, totalShipper, salesData] = await Promise.all([
            user_model.countDocuments(),
            user_model.countDocuments({ role: 'USER' }),
            user_model.countDocuments({ role: 'SHIPPER' }),
            order_model.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                            $lte: new Date(`${year}-12-31T23:59:59.999Z`)
                        },
                        status: { $in: [2, 3] } // Filter orders with status 2 or 3
                    }
                },
                {
                    $unwind: "$order_detail" // Unwind the order_detail array
                },
                {
                    $lookup: {
                        from: "OrderDetails", // Lookup the actual OrderDetails
                        localField: "order_detail",
                        foreignField: "_id",
                        as: "orderDetailInfo"
                    }
                },
                {
                    $unwind: "$orderDetailInfo" // Unwind the lookup result
                },
                {
                    $addFields: {
                        month: { $month: "$createdAt" }     
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        monthlyTotal: { $sum: "$orderDetailInfo.total" },
                        orderCount: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ])
        ]);

        return {
            total_users: {
                total: userList,
                total_customer: totalCustomer,
                total_shipper: totalShipper,
                total_admin: userList - (totalCustomer + totalShipper)
            },
            sales: salesData
        };
    } catch (error) {
        console.error('Error in getAnalysisDetail:', error);
        throw new Error('Failed to retrieve analysis details');
    }
};
module.exports={
    getAnalysisDetail

}

