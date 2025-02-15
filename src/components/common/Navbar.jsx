import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FlashcardModal from '../Flashcard/FlashcardModal';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authAPI';

const Navbar = () => {
    const [dropDown,setDropDown] = useState(false);
    const {user} = useSelector((state) => state.user);
    const [openModal,setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
    <div className='w-full border-b border-gray-300 h-[60px] md:h-[50px]'>
        <div className='flex justify-between items-center pt-1 w-11/12 max-w-maxContent mx-auto'>
            <div>
                <p className="bg-gradient-to-r text-md md:text-2xl font-bold from-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text">Trilingo-Flashcard-Leitner-System</p>
            </div>
            <div className='flex items-center gap-4'>
                <button 
                onClick={() => setOpenModal(true)}
                className='px-[12px] py-[8px] border border-purple-300 rounded-md bg-purple-600 text-white text-nowrap hover:bg-purple-400'>
                    Create Card
                </button>
                <div className='flex justify-evenly items-center p-1 rounded-lg gap-2'>
                <div>
                    <img src={`${user.imageUrl}`} alt="userImage" className='md:h-[30px] md:w-[30px] rounded-full aspect-square object-cover'/>
                </div>
                <p className='hidden md:block'>
                    {user.firstName}{" "}{user.lastName}
                </p>
                <div className="relative transition-all ease-linear duration-200"
                onClick={() => setDropDown(!dropDown)}>
                    <IoIosArrowDown className={`cursor-pointer`}/>
                    {
                        dropDown ? 
                        (
                            <div className='absolute border border-black/40 bg-white rounded-xl z-[1500] -left-20 top-8 w-fit text-nowrap px-5 py-3 transition-all duration-200 ease-linear'>
                                <div className='absolute h-6 w-6  rotate-45 border-t border-l left-[75px] -top-3 border-black/40 bg-white z-[1000] '></div>
                                <button onClick={() => dispatch(logout(navigate))}
                                    className='flex items-center gap-x-2'>
                                    <CiLogout />
                                    <p>Log Out</p>
                                </button>
                                
                            </div>
                        ) :
                        (
                            null
                        )
                    }
                </div>
            </div>
            </div>
        </div>
        {
            openModal && <FlashcardModal setOpenModal={setOpenModal}/>
        }
    </div>
  )
}

export default Navbar