import logo from './logo.svg';
import './App.css';
import ExcelFile from './Components/ExcelFile/ExcelFile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<ExcelFile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
