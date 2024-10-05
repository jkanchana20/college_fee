import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { House } from 'react-bootstrap-icons';

import './Admin.css'
const AdminNav = () => {
  const [state, setState] = useState("Home")
  localStorage.setItem(state,"state")
  const [preState,setPreState]=useState(localStorage.getItem("state"))
  const storedToken = localStorage.getItem("")
  const navigate = useNavigate();
  const logout = () => {

    localStorage.removeItem("token")
    navigate("/")
  }
  const reDirectToCharts = (() => {
    navigate("/charts")
    setState("Chart")
  })
  const reDirectToHome = (() => {
    navigate("/dashboard")
    setState("Home")
  })
  const reDirectToRegister = (() => {
    navigate("/register")
    setState("Register")
  })
  const reDirectToTransactions = (() => {
    navigate("/alltransactions")
    setState("Transaction")
  })
  const reDirectToUpdate = (() => {
    navigate("/update")
    setState("Updation")
  })
  const reDirectToDelete = (() => {
    navigate("/studentDelete")
    setState("Deletion")
  })
  const SearchGo = () => {
    navigate("/search")
    setState("Search")

  }
  return (

    <div className='sticky-top'>
      <Navbar expand="lg" className="bg-body-dark mb-3 sticky" id="nav">
        <Container fluid>
          <Navbar.Brand className="admin"><h3 id='h1'>Admin Dashboard</h3></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            className="bg-body-dark"
            id="nav"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg}`} className="admin"><h2 id="h1">Admin Dashboard</h2></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-1 g-5" id='container'>
                <Button exact activeClassName="active" to="/dashboard" onClick={reDirectToHome} variant="outline-primary" id="link" style={{ borderBottom: preState === "Home" ? "2px solid red" : "2px solid blue" }}><House size={20} color='red' className='rounded-5 bg-secondary p-1' style={{ marginTop: "2px" }} />Home</Button><br />

                <Button activeClassName="active" id='link' to="/register" onClick={reDirectToRegister} variant="outline-primary" style={{ borderBottom:preState  === "Register" ? "2px solid red" : "2px solid blue"}}><img src="./student.png" width={20} height={20} alt="" className='rounded-5 bg-success' />create student</Button><br />

                <Button activeClassName="active" id='link' to="/studentDelete" style={{borderBottom:preState ==="Deletion"?"2px solid red":"2px solid blue"}} onClick={reDirectToDelete} variant="outline-primary"><img src="./dels.webp" width={20} height={20} alt="" className='rounded-5' />deletion</Button><br />

                <Button activeClassName="active" id='link' to="/update" style={{ marginTop: "2px" }} onClick={reDirectToUpdate} variant="outline-primary"><img src="./update.jpg" width={20} height={20} alt="" className='rounded-5' style={{borderBottom:preState ==="Updation"?"2px solid red":"2px solid blue"}} />updation</Button><br />

                <Button activeClassName="active" id='link' to="/alltransactions" style={{borderBottom:state==="Transaction"?"2px solid red":"2px solid blue"}} onClick={reDirectToTransactions} variant="outline-primary"><img src="./transactions.png" width={20} height={20} alt="" />transactions</Button><br />

                <Button activeClassName="active" id='link' to="/charts" onClick={reDirectToCharts} variant="outline-primary" style={{borderBottom:preState ==="Chart"?"2px solid red":"2px solid blue"}}><img src="./charts.webp" width={20} height={20} alt="" />charts</Button><br />

                <Button variant="outline-success" id="link" onClick={SearchGo}style={{borderBottom:preState ==="Search"?"2px solid red":"1px solid green"}}>Search</Button><br />
                <Button className='bg-danger' id="link" onClick={logout}><img src="./logout.jpg" width={20} height={20} alt="" className='rounded-5' />log out</Button>

              </Nav>




            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>

  );
}

export default AdminNav; 