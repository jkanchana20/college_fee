import { useState } from 'react';
import React from 'react';
import { Button, Container, FormControl, Form, Table, Badge, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import AdminNav from './Admin/AdminNav';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(null);
    const [show, setShow] = useState(true);

    const getSearchItem = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async () => {
        try {
          if(searchTerm.length>10){
            toast.error("Enter a valid roll number", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000, // Close the toast after 3 seconds
              hideProgressBar: false, // Show progress bar
              closeOnClick: true, // Close the toast when clicked
              pauseOnHover: true, // Pause closing when hovered
              draggable: true, // Allow dragging the toast
              progress: undefined // Progress bar style
            });
            
          }
            const res = await axios.post("http://localhost:3001/searchStudent", { rollNumber: searchTerm });
            setData(res.data);
            setShow(true);
            toast.success("result retrived successfully")
        } catch (err) {
            console.error("Error at", err);
        }
    };

    return (
        <div>
            <AdminNav />
            <Container>
                {show? (
                    <div >
                      {data && data.name ? (
                            <div className='search-back'>
                                <h3>this student name is <span className='text-danger'>{data.name}</span> bearing roll number <span className='text-danger'>{data.rollNumber}</span>, she is studying <span className='text-danger'>{data.year}rd CSE </span> in <span className="text-danger"> {data.section} </span > section</h3>
                                <div>
                                    <h2>all transactions of {data.name} is</h2>
                                    <hr />
                                    {data.transactions && data.transactions.length > 0 ? (
                                        <Table responsive striped bordered hover className="custom-table rounded">
                                            <thead>
                                                <tr>
                                                    <th>TransID</th>
                                                    <th>Amount</th>
                                                    <th>Category</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.transactions.map((item) => (
                                                    <tr key={item._id}>
                                                        <td>{item.transactionId}</td>
                                                        <td>{item.amount}₹</td>
                                                        <td>{item.categoryFee}</td>
                                                        <td>{item.date.slice(0, 10)}</td>
                                                        <td>
                                                            <Badge bg="success">Success</Badge>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    ) : (
null                                    )}
                                </div>
                            </div>
                        ) : (
                          null
                        )}
                    </div>
                ) : (<div>Enter correct roll number</div>)}
                <div className='fixed-bottom'>
                    <Form className='d-flex justify-content-center' id="search-bar">
                        <FormGroup>
                            <FormControl
                                placeholder="Enter your roll number to search"
                                type="text"
                                onChange={getSearchItem}
                                className='input'
                            />
                        </FormGroup>
                        <FormGroup><Button onClick={handleSubmit}>Search</Button></FormGroup>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default Search;
