import React, { useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCards } from '../services/operations/flashCardAPI';
import Card from '../components/Flashcard/Card';
import toast from 'react-hot-toast';

const FlashCard = () => {
    const {flashCards} = useSelector((state) => state.user);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    useEffect(() =>{
        const fetchCard = async () =>{
            try {
                const response = await getCards(token,dispatch);


            } catch (error) {
                
            }
        }
        fetchCard()
    },[])
    console.log("PRINTING FLASHCARD DETAILS: ",flashCards);

  return (
    <div>
        <Navbar/>
        <div className='bg-gradient-to-t min-h-screen p-4 from-purple-200'>
            <div className='w-11/12 max-w-maxContent mx-auto mt-5 '>
                {
                    flashCards?.length > 0 ?
                    (
                        <div>
                            <div>
                                <p className='text-4xl font-semibold'>You have {flashCards.length} flashcard due today</p>
                            </div>
                            <div className='mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                {
                                    flashCards.map((card,index) =>(
                                        <Card card={card} key={index}/>
                                    ))
                                }
                            </div>
                        </div>
                    ) : 
                    (
                        <div>
                            <p>No FlashCard Remaining for today</p>
                        </div>
                    )  
                    
                    
                }
            </div>
        </div>
        
    </div>
  )
}

export default FlashCard