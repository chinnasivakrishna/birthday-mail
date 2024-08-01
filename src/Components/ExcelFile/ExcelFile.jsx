import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './ExcelFile.css';
import Header from '../Header/Header';
import Head from '../Head/Header';
import ExcelHeader from './ExcelHeader';
import Footer from '../Foot/Footer';
import upload from '../photos/upload-unscreen.gif';
import { useLocation, useNavigate } from 'react-router-dom';

const FileUploader = ({ onDrop }) => {
  const handleDrop = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles[0]);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <img src={upload} className='upload' alt="upload"/>
      {isDragActive ? (
        <p>Drop the Excel here ...</p>
      ) : (
        <p>Drag and drop an Excel file here, or click to select a file</p>
      )}
    </div>
  );
};

const send = async() => {
  try {
    const response = await axios.get("https://birthday-5nx0.onrender.com/send");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

const ExcelFile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { user, id } = state || {};
  console.log(user);
  if (!location.state) {
    navigate('/');
    return null;
  }

  const requiredColumns = ['S.No', 'Name', 'EMP', 'Email', 'D.O.B'];

  const handleFileUpload = async (file) => {
    let count = 0;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });

      const sno = 'S.No';
      const Name = 'Name';
      const EMPID = 'EMP';
      const Email = 'Email';
      const DOB = 'D.O.B';
      console.log(jsonData.length);

      const convertedDataPromises = jsonData.slice(1).map(async (row) => {
        if (!isNaN(Number(row[requiredColumns.indexOf(sno)]))) {
          console.log(row[requiredColumns.indexOf(sno)]);
          const convertedRow = {};

          if (requiredColumns.includes(DOB) && row[requiredColumns.indexOf(DOB)] !== undefined) {
            const dateString = row[requiredColumns.indexOf(DOB)];
            console.log(dateString);
            convertedRow[DOB] = dateString;
            console.log(convertedRow[DOB]);
          }

          if (requiredColumns.includes(Name)) {
            const EmpName = row[requiredColumns.indexOf(Name)];
            convertedRow[Name] = EmpName;
          }

          if (requiredColumns.includes(EMPID)) {
            const EMPLID = row[requiredColumns.indexOf(EMPID)];
            convertedRow[EMPID] = EMPLID;
          }

          if (requiredColumns.includes(Email)) {
            convertedRow[Email] = row[requiredColumns.indexOf(Email)];
          }

          try {
            console.log(convertedRow[Name]);
            console.log(convertedRow[EMPID]);
            console.log(convertedRow[Email]);
            console.log(convertedRow[DOB]);
            const response = await axios.post('https://birthday-5nx0.onrender.com/api/employees/add', {
              User: id,
              EmpName: convertedRow[Name],
              EMPID: convertedRow[EMPID],
              Email: convertedRow[Email],
              DOB: convertedRow[DOB],
              Date: convertedRow[DOB],
            });
            if (response.data.DOB) {
              count = count + 1;
              convertedRow[count] = row[count];
              console.log(count);
            }
            console.log(response.data);
          } catch (error) {
            console.error('Error:', error);
          }
          return convertedRow;
        }
        return null;
      });

      const convertedData = await Promise.all(convertedDataPromises);
      console.log(convertedData);

      if (count > 0) {
        alert(`${count} employess uploaded successfully`);
      } else {
        alert("Failed to upload");
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <ExcelHeader user={id} />
      <div className="container">
        <FileUploader onDrop={handleFileUpload} />
      </div>
      <Footer />
    </div>
  );
};

export default ExcelFile;
