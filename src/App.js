import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import VerifyEmail from './pages/verify-email';
import ForgotPassword from './pages/forgot-password';
import Signup from './pages/Signup';
import UpdatePassword from './pages/UpdatePassword';
import OpenRoute from './components/Auth/OpenRoute';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import FlashCard from './pages/FlashCard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>} ></Route>
        <Route path="/verify-email" element={<VerifyEmail/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="reset-password/:id" element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />
        <Route path='/flashcard' element={
          <ProtectedRoute>
            <FlashCard/>
          </ProtectedRoute>
        }>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
