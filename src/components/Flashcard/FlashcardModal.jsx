import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux';
import { createCard } from '../../services/operations/flashCardAPI';
import toast from 'react-hot-toast';

const FlashcardModal = ({setOpenModal}) => {
    const [question,setQuestion] = useState('');
    const [answer,setAnswer] = useState('');
    const dipsatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const handleOnSubmit = async () =>{
        if(!token){
            toast.error("Token missing");
            return;
        }


        const result = await createCard(question,answer,token);
        console.log("PRINTING RESULT: ",result);
        setOpenModal(false);
    }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                <div className='w-[100%]'>
                    <div className='flex justify-between items-center'>
                        <p className="text-2xl font-semibold text-richblack-5">
                            Create New FlashCard
                        </p>
                        <button
                        onClick={() => setOpenModal(false)}>
                            <RxCross2/>
                        </button>   
                    </div>
                    <div className="flex items-center mt-4 ">
                        <form onSubmit={handleOnSubmit} className='w-full space-y-2'>
                            <label className='w-full'>
                                <p className='text-md font-medium'>Question <sup className='text-pink-800'>*</sup></p>
                                <input 
                                type="text" 
                                name="question"
                                value={question}
                                onChange={(event) => setQuestion(event.target.value)}
                                className='border rounded-md border-gray-400 p-2 mt-1 w-full focus:outline-none'/>
                            </label>
                            <label className='w-full'>
                                <p className='text-md font-medium'>Answer <sup className='text-pink-800'>*</sup></p>
                                <input 
                                type="text" 
                                name="answer"
                                value={answer}
                                onChange={(event) => setAnswer(event.target.value)}
                                className='border rounded-md border-gray-400 p-2 mt-1 w-full focus:outline-none'/>
                            </label>
                            <div className='flex justify-end'>
                                <button className=' mt-2 px-[12px] py-[8px] bg-purple-500 text-white rounded-md'>
                                    Create
                                </button>
                            </div>
                            
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
  )
}

export default FlashcardModal