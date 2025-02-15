import React, { useState } from 'react'
import {motion} from "framer-motion"
import "./card.css"
import { deleteCard, updateCard } from '../../services/operations/flashCardAPI';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { updateFlashCard } from '../../slices/userSlice';
import { RiDeleteBin6Line } from 'react-icons/ri';
const Card = ({card}) => {
    const [flip,setFlip] = useState(true);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const rightHandler = async () =>{
        const response = await updateCard(true,card._id,token)
        toast.success("Congrats for getting the correct answer");
        setFlip(true);
        dispatch(updateFlashCard(card._id))
    }
    const wrongHandler = async () =>{
        const response = await updateCard(false,card._id,token);
        toast.error("Hope you now learned the correct answer!")
        setFlip(true)
        dispatch(updateFlashCard(card._id))
    }
    const deleteHandler = async () =>{
        const response = await deleteCard(card._id,token);
        setFlip(true);
        dispatch(updateFlashCard(card._id));
    }
  return (
    <div className='p-2'>
        <motion.div
        style={{ width: "20rem", height: "20rem" }}
        transition={{ duration: 0.7 }}
        animate={{ rotateY: flip ? 0 : 180 }}
      >
        <motion.div
          transition={{ duration: 0.7 }}
          animate={{ rotateY: flip ? 0 : 180 }}
          className="Card flex flex-col justify-between"
        >
          <motion.div
            transition={{ duration: 0.7 }}
            animate={{ rotateY: flip ? 0 : 180 }}
            className="front text-center pt-2 text-xl font-medium"
          >
            Question

            <p className='text-md font-normal mt-2'>
                {card.question}
            </p>
          </motion.div>
          <motion.div
            initial={{ rotateY: 180 }}
            animate={{ rotateY: flip ? 180 : 0 }}
            // style={{ display: flip ? "none" : "block" }}
            transition={{ duration: 0.7 }}
            className="back text-center text-xl font-medium"
          >
            Answer

            <p>
                {card.answer}
            </p>
          </motion.div>
          <button 
          className='pb-2 px-[12px] py-[8px] rounded-md bg-purple-300 w-fit mx-auto mb-5'
          onClick={() => setFlip((prevState) => !prevState)}>
            {flip ? "Revel Answer" : "Reveal Question"}
          </button>
          {
            !flip && 
            (
                <div className='flex justify-evenly mb-5'>
                    <button 
                    onClick={() => wrongHandler()}
                    className='pb-2 px-[12px] py-[8px] rounded-md bg-red-600 w-fit mx-auto mb-5'>
                        Got It Wrong!
                    </button>
                    <button
                    onClick={rightHandler}
                    className='pb-2 px-[12px] py-[8px] rounded-md bg-green-600 w-fit mx-auto mb-5'>
                        Got It Right!
                    </button>
                </div>
            )
          }
            <div className='flex items-center justify-center mb-2'>
                <button 
                onClick={() => deleteHandler()}
                className='text-red-500 text-xl'>
                    <RiDeleteBin6Line/>
                </button>
            </div>
        </motion.div>
        
      </motion.div>
    </div>
  )
}

export default Card