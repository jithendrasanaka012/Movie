import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';

import { useNavigate } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Bs = () => {
    let navigate = useNavigate()

    let [api,setapi] = useState([])
    let [search,setsearch] = useState("")

    useEffect(()=>{
        fetch("https://api.themoviedb.org/3/trending/movie/day?&api_key=caa70c793d4d1bd32591a3325ee86e3e&language=en-US")
        .then(x=>x.json()).then(y=>setapi(y.results))
        .catch(e=>console.error("error",e))
    },[])

    function movieSearch(){
        fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=caa70c793d4d1bd32591a3325ee86e3e`)
        .then(x=>x.json()).then(x=>setapi(x.results))
        .catch(err => console.log('error', err));
    }
  return (
    <div>
       <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e)=>setsearch(e.target.value)}
            />
            <Button onClick={movieSearch} variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Carousel>
        {
            api.map(y=>{
                return(
                    <div key={y.id}>
                        <img src={`https://image.tmdb.org/t/p/original/${y.backdrop_path}`} alt='images'/>
                        <h1>{y.title}</h1>
                        <p>{y.overview}</p>
                    </div>
                )
            })
        }
    </Carousel>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
        {
            api.map((x,y)=>{
                return(
                  <div key={y}>
                     <Card style={{ width: '18rem',border:"solid 2px", marginTop:"30px"}}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${x.backdrop_path}`} />
                <Card.Body>
                  <Card.Title>{x.title}</Card.Title>
                  <Card.Text>
                    {x.overview}
                  </Card.Text>
                  <Button variant="primary" onClick={()=>navigate('/movieDetails',{state:{x}})} >More details</Button>
                </Card.Body>
              </Card>
                  </div>
                )
            })
        }
    </div>
    </div>
  )
}

export default Bs
