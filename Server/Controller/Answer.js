import mongoose from 'mongoose'
import QuestionsModel from "../Model/QuetionsSchema.js";


export const postAnswer=async(req,res)=>{
const {id:_id}=req.params

const {answerBody, userAnswered, noOfAnswers}= req.body

const userId= req.userId;


if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send("question unavailable....")
}

updateNoOfQuestions(_id, noOfAnswers)

try {
    
const updateQuestion= await QuestionsModel.findByIdAndUpdate(_id, {
    $addToSet:{answer:[{answerBody, userAnswered, userId}]}
})

res.status(200).json(updateQuestion)

} catch (error) {
    console.log(error);
   res.status(400).json("error in updating") 
}

}


const updateNoOfQuestions= async (_id, noOfAnswers)=>{

try {
    
    await QuestionsModel.findByIdAndUpdate(_id, {
        $set:{noOfAnswers:noOfAnswers}
    })

} catch (error) {
    console.log(error);
}


}


export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('Question unavailable...');
    }
  
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
      return res.status(404).send('Answer unavailable...');
    }
  
    try {
      // Update the number of answers (if required)
      if (noOfAnswers !== undefined) {
        await updateNoOfQuestions(_id, noOfAnswers);
      }
          
      

      // Use findOneAndUpdate to update the document with $pull
      const result = await QuestionsModel.findOneAndUpdate(
        { _id },
        { $pull: { answer: { _id: answerId } } },
        { new: true }
      );
           
      if (!result) {
        return res.status(404).send('Question not found...');
      }
  
      res.status(200).json({ message: 'Successfully deleted...' });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  };
  