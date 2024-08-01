import Header from '../Head/Header';
import Footer from '../Foot/Footer';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Uploads.css';
import axios from 'axios';
import Uploadheader from './Uploadheader';

const Uploads = () => {
  const [searchType, setSearchType] = useState('id'); 
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [editRowId, setEditRowId] = useState(null); // State to track the row being edited
  const [editValues, setEditValues] = useState({}); // State to track the values being edited
  const transactionsPerPage = 10;
  const location = useLocation();
  const { state } = location;
  const { user } = state || {};

  useEffect(() => {
    

    fetchAccounts();
  }, [user]);
  const fetchAccounts = async () => {
      try {
        const response = await axios.get(`https://birthday-5nx0.onrender.com/api/employees/data/${user}/`);
        setTransactions(response.data.DOB);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  const accountsacc = transactions.map((accountss, index) => ({
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

  const filteredTransactions = accountsacc.filter((transaction) => {
    if (searchType === 'id') {
      return transaction.id.toString().includes(searchValue);
    } else if (searchType === 'name') {
      return transaction.EmpName.includes(searchValue);
    } else if (searchType === 'email') {
      return transaction.Email.includes(searchValue);
    } else if (searchType === 'dateCreated') {
      return transaction.Date.includes(searchValue);
    }
    return false;
  });

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

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

  const handleEditClick = (transaction) => {
    setEditRowId(transaction.id);
    setEditValues({
      EMPID: transaction.EMPID,
      EmpName: transaction.EmpName,
      Email: transaction.Email,
      Date: transaction.Date,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveClick = async(transactionId) => {
    console.log(editValues.Email)
    console.log(transactionId)
   
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === transactionId ? { ...transaction, ...editValues } : transaction
      )
    );
     try {
      const response = await axios.put(`https://birthday-5nx0.onrender.com/api/employees/update/${transactionId}`, {
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
    <div className="transactions-page">
      <div className="transactions-container">
        <div className="transactions-header">
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
        <table className="transactions-table">
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
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id} className={`${transaction.id % 2 === 0 ? 'odd' : 'even'}`}>
                {editRowId === transaction.id ? (
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
                      <button onClick={() => handleSaveClick(transaction._id)}>Done</button>
                    </td>
                  </>
                ) : (
                    <>
                      <td>{transaction.EMPID}</td>
                      <td>{transaction.EmpName}</td>
                      
                    <td>{transaction.Email}</td>
                    <td className="td">{formatDate(transaction.Date)}</td>
                    <td className="td">
                      <button onClick={() => handleEditClick(transaction)}>Update</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Showing {indexOfFirstTransaction + 1} to {Math.min(indexOfLastTransaction, filteredTransactions.length)} of {filteredTransactions.length} entries</span>
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
