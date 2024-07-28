import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'; 
import * as XLSX from 'xlsx'; 
import './ExcelFile.css';

const FileUploader = ({ onDrop }) => {
  const handleDrop = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles[0]); 
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <label htmlFor="file-input" className="custom-file-upload">Upload Excel File</label>
    
      {isDragActive ? (
        <p>Drop the Excel here ...</p>
      ) : (
        <p>Drag and drop an Excel file here, or click to select a file</p>
      )}
    </div>
  );
};

const ExcelFile = () => {
  const requiredColumns = ['S.No', 'Name', 'EMP', 'Email', 'D.O.B'];

  const handleFileUpload = async (file) => {
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
      // eslint-disable-next-line
      const convertedData = jsonData.slice(1).map(async (row) => {
        if (!isNaN(Number(row[requiredColumns.indexOf(sno)]))) {
          console.log(row[requiredColumns.indexOf(sno)]);
          const convertedRow = {};

          if (requiredColumns.includes(DOB) && row[requiredColumns.indexOf(DOB)] !== undefined) {
            const dateString = row[requiredColumns.indexOf(DOB)];
            console.log(dateString);
            convertedRow[DOB] = new Date(dateString);
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
            const response = await axios.post('https://birthday-three-lac.vercel.app/api/employees/add', {
              EmpName: convertedRow[Name],
              EMPID: convertedRow[EMPID],
              Email: convertedRow[Email],
              DOB: convertedRow[DOB],
            });
            console.log(response.data);
          } catch (error) {
            console.error('Error:', error);
          }

          return convertedRow;
        }
      });
      alert("Your file uploaded successfully");

    };
    reader.readAsBinaryString(file);
  };

  const handleDownload = () => {
    window.location.href = 'birthday.xlsx';
  };

  return (
    <div className="container">
      <FileUploader onDrop={handleFileUpload} />
      <button className="download-button" onClick={handleDownload}>
        <i class="fa-solid fa-download"></i>  Download Sample Excel
      </button>
    </div>
  );
};

export default ExcelFile;
