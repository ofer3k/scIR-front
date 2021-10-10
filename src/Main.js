import React, { useEffect, useState } from 'react'
import {getAllData,getDataForNeighborhood,getDataForCounty, getDataForCountyAndRoom, getValueForCountyAndRoom} from './server'
import { v4 as uuidv4 } from 'uuid';
import {  Accordion, Card, Col, Container, Dropdown, DropdownButton, ListGroup, Nav, Navbar, NavDropdown, Row, Table } from 'react-bootstrap';
import './style/style.css'
export default function Main() {
    const [data,setData]=useState([])
    const [min,setMin]=useState('')
    const [max,setMax]=useState('')
    const [avg,setAvg]=useState('')
    const [avgValue,setAvgValue]=useState(0)
    const [geoLocation,setGeoLocation]=useState('')

    const [counties,setCounties]=useState([])
    const [apartments,setApartments]=useState([])

    const initialData=async()=>{
       console.log('hey')
        const res=await getAllData()
        setData(res.data.neighborhoods)
        setCounties(res.data.counties)
    }
    const handleRoomsChange=async(e)=>{
      const rooms=parseFloat(e.target.name)
      const filteredData=await getDataForCountyAndRoom(geoLocation,rooms)
      const valueOfRent=await getValueForCountyAndRoom(geoLocation,rooms)
      if(valueOfRent.data.avg)
      setAvgValue(valueOfRent.data.avg)
      else{setAvgValue(0)}
      console.log(valueOfRent)
      setApartments(filteredData.data.data)
      setMin(filteredData.data.min)
      setMax(filteredData.data.max)
      setAvg(filteredData.data.avg)
    }

    const handleClick=async(e)=>{
     const res=await getDataForNeighborhood(e.target.name)
     setMin(res.data.min)
     setMax(res.data.max)
     setAvg(res.data.avg)
     setApartments(res.data.data)
     setGeoLocation(e.target.name)
     console.log(res,'res')
    }
    const handleClickCounty=async(e)=>{
        const res=await getDataForCounty(e.target.name)
        setMin(res.data.min)
        setMax(res.data.max)
        setAvg(res.data.avg)
        setApartments(res.data.data)
        setGeoLocation(e.target.name)
       }

    useEffect(() => {
        initialData()
    }, [])
    return (
        <div>
            <Navbar bg="light" expand="lg">
  <Container style={{display:'flex',justifyContent:'space-between'}}> 
  <Navbar.Brand >Tal's Scrapper</Navbar.Brand>
  <Nav >Location:{geoLocation}</Nav>
  <Nav >Amount:{apartments.length>0&&apartments.length}</Nav>
  </Container>
</Navbar>
{/*  */}

<Navbar className={'navbar_bottom'}  fixed="bottom" expand="lg">
  <Container style={{display:'flex',justifyContent:'space-between'}}> 
  <Navbar.Brand >min:{
  (min).toLocaleString('en-US', {
    style: 'currency',
    currency: 'EUR',
  })}
  </Navbar.Brand>
  <Nav >max:{
  (max).toLocaleString('en-US', {
    style: 'currency',
    currency: 'EUR',
  })}</Nav>
  <Nav >avg:{
  (avg).toLocaleString('en-US', {
    style: 'currency',
    currency: 'EUR',
  })}</Nav>
  </Container>
</Navbar>
{/*  */}
<Container>
  
  <Row>
  <Col>
  <DropdownButton id="dropdown-basic-button" title="Counties">
            {counties.map((e)=>{
            {console.log(e,'eeeeeeeeee')}
            if(e&&!e.includes('.'))
            return<Dropdown.Item name={e} onClick={handleClickCounty}  key={uuidv4()} >{e}</Dropdown.Item>
            })}
</DropdownButton>
</Col>
  <Col style={{marginBottom:'20px'}}>
    <DropdownButton id="dropdown-basic-button" title="Neighborhoods">
            {data.map((e)=><Dropdown.Item name={e} onClick={handleClick} key={uuidv4()} >{e}</Dropdown.Item>)}
    </DropdownButton>
</Col>

<Col>
<DropdownButton  id="dropdown-basic-button" title="Rooms">
            <Dropdown.Item onClick={handleRoomsChange} value={1}  name={1}>1</Dropdown.Item>
            <Dropdown.Item onClick={handleRoomsChange} value={2} name={2}>2</Dropdown.Item>
            <Dropdown.Item onClick={handleRoomsChange} value={3} name={3}>3</Dropdown.Item>
            <Dropdown.Item onClick={handleRoomsChange} value={4} name={4}>4</Dropdown.Item>
            <Dropdown.Item onClick={handleRoomsChange} value={5} name={5}>5</Dropdown.Item>
            <Dropdown.Item onClick={handleRoomsChange} value={6} name={6}>6</Dropdown.Item>
            <Dropdown.Item onClick={handleRoomsChange} value={7} name={7}>7</Dropdown.Item>
            <Dropdown.Item onClick={handleRoomsChange} value={8} name={8}>8</Dropdown.Item>
            <Dropdown.Item onClick={handleRoomsChange} value={9} name={9}>9</Dropdown.Item>
            <Dropdown.Item onClick={handleRoomsChange} value={10} name={10}>10</Dropdown.Item>
    </DropdownButton>
</Col>
  </Row>
  <Row >
  <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Buy/Rent</th>
      <th>Region</th>
      <th>City/County</th>
      <th>Area/Neighborhood</th>
      <th>Property Type</th>
      <th>Current Price</th>
      <th>Bedrooms</th>
      <th>Baths</th>
      <th>Link</th>
      <th>Full Content</th>
      <th>AVG Yield</th>
    </tr>
  </thead>
  <tbody>
 {apartments.map((e,i)=>
    <tr key={uuidv4()}>
    <td>{e.index}</td>
    <td>Buy</td>
    <td>{e.Region}</td>
    <td>{e.county}</td>
    <td>{e.neighborhood}</td>
    <td>{e.propertyType}</td>
    <td className={e.price>avg?'red':'green'} >{e.price}</td>
    <td>{e.bedrooms}</td>
    <td>{e.baths}</td>
    <td>{e.link}</td>
    <td >
      {e.fullContent}
      </td>
      <td>{avgValue>0&&Number(((avgValue*1200)/e.price).toFixed(2))}%</td>
  </tr> 
 )}  
  </tbody>
</Table>
  </Row>
</Container>
    
        <div>
{console.log(apartments)}            
        </div>
        </div>
    )
}
