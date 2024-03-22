import { instance } from '../app.js'
import crypto from 'crypto'
import trackPlan from '../Model/TrackUserPlan.js'

let storedOrder = null;
let userIds = null;
export const checkOut = async (req, res) => {
  try {
    userIds = req.userId;

    const options = {
      amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options)
    storedOrder = order;
    return res.status(200).json({ message: "Order Created Successfully", order })
  }
  catch (error) {
    console.log(error);
    return res.status(400).send("Failed T Create Order")
  }
}

export const paymentVerify = async (req, res) => {
  try {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order } = req.body
    console.log(order);
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log(req.body);
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {


      // Retrieve order details from storedOrder
      if (storedOrder) {
        const updatedOrder = await instance.orders.fetch(storedOrder.id);
        storedOrder = updatedOrder;

        console.log(userIds);
        if (!userIds) {
          throw new Error("Unknown user")
        }

        const paymentDetails = await trackPlan.findOne({ userId: userIds });

        if (!paymentDetails) {

          const addNewUserPayment = new trackPlan({
            userId: userIds,
            userPayments: [{ razorpay_order_id, razorpay_payment_id, razorpay_signature }]
          })
          console.log("I am a new User:", addNewUserPayment);
          await addNewUserPayment.save();

        }

        const userPlan = paymentDetails.userPayments.push({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
        console.log("I am a new ExistingUser:", userPlan);
        await paymentDetails.save();
        if (userPlan) {
          console.log("complete");
        }
      }

      res.redirect(
        `http://localhost:3001/paymentsuccess?reference=${razorpay_payment_id}&orderDetails=${encodeURIComponent(JSON.stringify(storedOrder))}&UserID=${userIds}`
      );



    }
    else {
      res.status(400).json({ success: false, message: "Something Went Wrong" });

    }

  } catch (error) {
    return res.status(400).send("Failed To Create Order")
  }
}



export const subscriptionDetails = async (req, res) => {

  try {


    const { userId, plan } = req.body
    if (!userId) {
      throw new Error("Unknown user")
    }


    const checkUser = await trackPlan.findOne({ userId });

    if (!checkUser) {
      const planDetails = new trackPlan({
        userId,
        userPlanName: [{ planName: "Silver", trackUserPlan: new Date() }],

      });
      await planDetails.save();
      return res.status(200).json({ message: "Successfully Added", planDetails });
    }

    const planDetails = await trackPlan.findOneAndUpdate({ userId }, { $set: { userPlanName: { planName: plan }, checkAskedQuestion: null } }, { new: true });


    if (!planDetails) {
      throw new Error("User plan details not found");
    }


    return res.status(200).json({ message: "Successfully Added", planDetails });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed To Added" });

  }

}


export const getUserPlan = async (req, res) => {
  try {
    const userId = req.userId;


    if (!userId) {
      return res.send("UnAuthorized User")
    }

    const planData = await trackPlan.findOne({ userId })
    const data = planData.userPlanName

    return res.status(200).json({ message: "Success", data })

  } catch (error) {
    return res.status(400).json("Failed TO Find Plan")
  }
}


export const checkingUserAskedQuestion = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.send("UnAuthorized User")
    }

    const checkUser = await trackPlan.findOne({ userId });

    if (!checkUser) {
      const addFreeUser = new trackPlan({
        userId,
        userPlanName: [{ planName: "Silver", trackUserPlan: new Date() }],
        checkAskedQuestion: req.body.updatedTime // This sets the checkAskedQuestion field for the new user
      });

      const savedUser = await addFreeUser.save();
      const askedTime = savedUser.checkAskedQuestion;
      return res.json({ message: "Success", askedTime })
    }

    const askedTime = await trackPlan.findOneAndUpdate({ userId: userId }, { $set: { checkAskedQuestion: req.body.updatedTime } });


    return res.json({ message: "Success", askedTime })
  } catch (error) {
    console.log(error);
    return res.send("Something Went Wrong")
  }
}

export const getUserQuestionTime = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.send("UnAuthorized User")
    }

    const checkUserTime = await trackPlan.findOne({ userId });
    if (checkUserTime) {
      const timeData = checkUserTime.checkAskedQuestion

      return res.json({ message: "Success", timeData })
    }
    return res.json({ message: "Success", timeData: null })
  } catch (error) {
    console.log(error);
    return res.json({ message: "Failed" })
  }
}