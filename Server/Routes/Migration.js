// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userQuestion from '../Model/QuetionsSchema.js';

// dotenv.config({ path: 'config.env' });

// const uri = process.env.DATABASE_URL;

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const Migration = async () => {
//   try {
//     const result = await userQuestion.updateMany(
//       {},
//       {
//         $set: {
//           userPayments: [{
//             razorpay_order_id: String,
//             razorpay_payment_id: String,
//             razorpay_signature: String,
//           }],
//         },
//       }
//     );
//     console.log('Migration successful');
//   } catch (err) {
//     console.error('Migration failed:', err);
//   }
// };

// export default Migration;
