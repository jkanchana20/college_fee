
import { Card, Col, Row,Table ,Button} from 'react-bootstrap';
import {useEffect,useRef,useState} from 'react';
import './Admin.css';
import Login from '../Login';
import AdminNav from './AdminNav';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
function Admin() {
  const profileRef=useRef();
    const [transactions, setTransactions] = useState([]);
 const storedToken=localStorage.getItem("token")
 const [totalTransactions,setTotalTransactions]=useState();
 useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/alltransactions');
      setTransactions(response.data);

      const totalAmt = response.data.reduce((acc, user) => {
        const transaction = user.transactions || [];

        const allTotal = transaction.reduce((userAcc, transaction) => {
          return userAcc + transaction.amount;
        }, 0);

        return acc + allTotal;
      }, 0);

      setTotalTransactions(totalAmt);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  fetchTransactions();
}, []);
const pdfDownload=async()=>{
  const contentRef = profileRef.current;

try {
  if (contentRef) {
    const canvas = await html2canvas(contentRef, { scale: 1 });
    const imageData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });
    pdf.addImage(imageData, 'PNG', 0, 0, 290, 210);
    pdf.save('all_user.pdf');
  }
} catch (err) {
  console.error(err);
}

}
  return (
    <>
    {storedToken?(
      <div>
    <AdminNav/>
      <Container>
        <Row lg={3} className='g-3'>
          <Col>
            <Card  id="card-1">
              <Card.Header className='h3'>total amount</Card.Header>
              <Card.Body className='d-flex'>
                <img src="./money.png" alt="nri" width={100} height={100} />
                <h2 className='mt-4'>{totalTransactions}RS  </h2>
              </Card.Body>
            </Card>
          </Col>
          <Col>
           
            <Card id="card-2">
              <Card.Header className='h3'>Nri student</Card.Header>
              <Card.Body className='d-flex '>
                <img src="./nri.png" alt="nri" width={100} height={100} />
                <h2 className='mt-4'>3000+</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card  id="card-3">
              <Card.Header className='h3'>counselling students</Card.Header>
              <Card.Body className='d-flex'>
                <img src="./student.png" alt="nri" width={80} height={80} />
                <h2 className='mt-4 '>50000+</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br/>
        <Row>
          
          <Col >
          <div className='heading-container' style={{display:"flex",justifyContent:"space-evenly"}}>
          <h1 id="h3">All User List</h1>
          <div>
         <Button onClick={pdfDownload}>download pdf</Button>
        
        </div>
          </div>
         
         
      
          {transactions && transactions.length > 0 ? (
        <Table responsive striped bordered hover className="custom-table" ref={profileRef}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Mobile Number</th>
              <th>admission type</th>
              <th>class</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.rollNumber}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.admissionType}</td>
                <td>{user.year}rd {user.section}</td>
                </tr>
              ))}
              </tbody>
              </Table>):null}
          </Col>
        </Row>
      </Container>
      </div>):(<Login/>)}
    </>
  );
}

export default Admin;
