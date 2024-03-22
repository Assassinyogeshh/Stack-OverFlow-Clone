import mongoose from "mongoose";


const userPlanDetials = new mongoose.Schema({

    userId: {
        type: String
      },

    userPayments: [{
        razorpay_order_id: {
            type: String,
        },
        razorpay_payment_id: {
            type: String,
        },
        razorpay_signature: {
            type: String,
        },
        paymentDate: { type: Date, default: Date.now }
    }],

    userPlanName: [{
        planName: {
            type: String,
        },

        trackUserPlan: { type: Date, default: Date.now }

    }],

    checkAskedQuestion: {
        type: String,
    }

});

const trackPlan = mongoose.model('userSubsDetail', userPlanDetials);

export default trackPlan