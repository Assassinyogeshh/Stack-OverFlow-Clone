import mongoose from "mongoose";

const userQuetionSchemas = new mongoose.Schema({

  quetionTitle: {
    type: String, required: "Question Must Have Tittle"
  },

  quetionBody: {
    type: String, required: "Question Must Have a Body"
  },
  quetionTags: {
    type: [String], required: "Question  Must Have a Tags"
  },

  upVote: {
    type: [String], default: []
  },

  downVote: {
    type: [String], default: []
  },
  userPosted: {
    type: String, required: "Question Must Have a Author"
  },
  userId: {
    type: String
  },
  askedOn: {
    type: Date, default: Date.now
  },
  noOfAnswers: {
    type: Number,
    default: 0,
  },



  answer: [
    {
      answerBody: String,
      userAnswered: String,
      userId: String,
      answeredOn: { type: Date, default: Date.now }
    },
  ],

});

const quetionModel = mongoose.model('Quetion', userQuetionSchemas)

export default quetionModel

