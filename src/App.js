import ExcelFile from './Components/ExcelFile/ExcelFile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import adapter from '@sveltejs/adapter-vercel';


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
