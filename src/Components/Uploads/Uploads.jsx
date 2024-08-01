import Header from '../Head/Header';
import Footer from '../Foot/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Uploads.css';
import axios from 'axios';
import Uploadheader from './Uploadheader';

const Uploads = () => {
  const [searchType, setSearchType] = useState('id'); 
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [editRowId, setEditRowId] = useState(null); // State to track the row being edited
  const [editValues, setEditValues] = useState({}); // State to track the values being edited
  const employeesPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { user } = state || {};
  

  useEffect(() => {
    if (!location.state) {
    navigate('/');
    return null;
    }
    else {
      fetchAccounts();
    }

    
  }, [user]);
  const fetchAccounts = async () => {
      try {
        const response = await axios.get(`https://birthday-5nx0.onrender.com/api/employees/data/${user}/`);
        setEmployees(response.data.DOB);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  const accountsacc = employees.map((accountss, index) => ({
    ...accountss,
    id: index + 1
  }));

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const filteredEmployees = accountsacc.filter((employee) => {
    if (searchType === 'id') {
      return employee.id.toString().includes(searchValue);
    } else if (searchType === 'name') {
      return employee.EmpName.includes(searchValue);
    } else if (searchType === 'email') {
      return employee.Email.includes(searchValue);
    } else if (searchType === 'dateCreated') {
      return employee.Date.includes(searchValue);
    }
    return false;
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationButtons = () => {
    if (totalPages <= 3) {
      return (
        <>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
              {i + 1}
            </button>
          ))}
        </>
      );
    }

    return (
      <>
        <button onClick={() => paginate(1)} className={currentPage === 1 ? 'active' : ''}>
          1
        </button>
        <button onClick={() => paginate(2)} className={currentPage === 2 ? 'active' : ''}>
          2
        </button>
        {currentPage > 3 && <span>...</span>}
        {currentPage > 2 && currentPage < totalPages - 1 && (
          <button onClick={() => paginate(currentPage)} className="active">
            {currentPage}
          </button>
        )}
        {currentPage < totalPages - 2 && <span>...</span>}
        <button onClick={() => paginate(totalPages - 1)} className={currentPage === totalPages - 1 ? 'active' : ''}>
          {totalPages - 1}
        </button>
        <button onClick={() => paginate(totalPages)} className={currentPage === totalPages ? 'active' : ''}>
          {totalPages}
        </button>
      </>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([], options);
  };

  const handleEditClick = (employee) => {
    setEditRowId(employee.id);
    setEditValues({
      EMPID: employee.EMPID,
      EmpName: employee.EmpName,
      Email: employee.Email,
      Date: employee.Date,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveClick = async(employeeId) => {
    console.log(editValues.Email)
    console.log(employeeId)
   
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId ? { ...employee, ...editValues } : employee
      )
    );
     try {
      const response = await axios.put(`https://birthday-5nx0.onrender.com/api/employees/update/${employeeId}`, {
      EmpName: editValues.EmpName,
      EMPID: editValues.EMPID,
      Email: editValues.Email,
      Date:editValues.Date
      })
      fetchAccounts()
    } catch (error) {
      
    }
    
    setEditRowId(null);
  };

  return (
    <div>
      <Uploadheader />
    <div className="employee-page">
      <div className="employee-container">
        <div className="employee-header">
          <h2>Employees</h2>
          <div className="search-box">
            <select value={searchType} onChange={handleSearchTypeChange}>
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="dateCreated">Date Created</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${searchType}`}
              value={searchValue}
              onChange={handleSearchValueChange}
            />
          </div>
        </div>
        <table className="employee-table">
          <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                
              <th>Email</th>
              <th>D.O.B</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id} className={`${employee.id % 2 === 0 ? 'odd' : 'even'}`}>
                {editRowId === employee.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="ID"
                        value={editValues.EMPID}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="EmpName"
                        value={editValues.EmpName}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="Email"
                        value={editValues.Email}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="Date"
                        value={editValues.Date}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td className="td">
                      <button onClick={() => handleSaveClick(employee._id)}>Done</button>
                    </td>
                  </>
                ) : (
                    <>
                      <td>{employee.EMPID}</td>
                      <td>{employee.EmpName}</td>
                      
                    <td>{employee.Email}</td>
                    <td className="td">{formatDate(employee.Date)}</td>
                    <td className="td">
                      <button onClick={() => handleEditClick(employee)}>Update</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, filteredEmployees.length)} of {filteredEmployees.length} entries</span>
          <div>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              &laquo;
            </button>
            {renderPaginationButtons()}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              &raquo;
            </button>
          </div>
        </div>
      </div>
      </div>
      <Footer />
      </div>
  );
};

export default Uploads;
