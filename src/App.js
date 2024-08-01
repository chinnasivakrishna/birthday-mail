import './App.css';
import ExcelFile from './Components/ExcelFile/ExcelFile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import EmployeeLogin from './Components/Login/EmployeeLogin';
import RegisterForm from './Components/Register/Register';
import Uploads from './Components/Uploads/Uploads';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<EmployeeLogin />}/>
        <Route path="/dash" element={<ExcelFile />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/upload' element={<Uploads />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
