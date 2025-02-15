import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='bg-gradient-to-t min-h-screen p-4 from-purple-200 w-screen'>
        <div className='place-items-center pt-4'> 
            <h1 className='text-4xl font-bold md:text-center '>
                Flashcard Learning App – Master Anything with Spaced Repetition    
            </h1>
            <p className='w-9/12 text-start mt-10 text-xl font-sans'>
            The Flashcard Learning App is a smart and efficient way to enhance your learning using the Leitner System, a scientifically proven method of spaced repetition. Whether you're preparing for exams, learning a new language, or mastering complex concepts, this app helps you retain information effectively by organizing flashcards into different review levels.            </p>
            <p className='mt-8 text-3xl font-semibold'>✨ Why settle for basic when you can have more?</p>
            <div className='text-lg font-medium mt-4 ml-16'>
                <p>✔ Create & Manage Flashcards – Easily add and organize flashcards with questions and answers.</p>
                <p>✔ Leitner System Implementation – Automatically schedules reviews based on your performance.</p>
                <p>✔ Smart Progression – Correct answers move flashcards to higher levels, while incorrect ones reset to reinforce learning.</p>
                <p>✔ Daily Reviews – Track and complete flashcards that are due for review each day.</p>
                <p>✔ User-Friendly Interface – Minimalist and distraction-free design for a seamless experience.</p>
            </div>
            <p className='mt-10 font-semibold font-sans text-xl'>Supercharge your learning with the Flashcard Learning App and make knowledge stick for the long term! 🚀</p>
            <div className='flex gap-16 mt-5 h-[100px]'>
                <button 
                onClick={() =>{
                    navigate("/login")
                }}
                className='text-2xl font-medium border rounded-md hover:text-2xl border-purple-700 px-[12px] py-[8px] hover:px-[20px] hover:py-[12px] transition-all duration-200 h-fit hover:bg-purple-500'>
                    Login
                </button>
                <button 
                onClick={() =>{
                    navigate("/signup")
                }}
                className='text-2xl font-medium border rounded-md hover:text-2xl border-purple-700 px-[12px] py-[8px] hover:px-[20px] hover:py-[12px] transition-all duration-200 h-fit hover:bg-purple-500'>
                    Sign Up
                </button>
            </div>
            

        </div>


    </div>
  )
}

export default Home