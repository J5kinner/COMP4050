import React from "react";
import "../assets/css/profile.css";
// @ts-ignore
// import profilePic from '../../resources/userProfile/default-user.jpg'
import "../assets/css/sidebar.css";
import "../assets/css/sidebarnav.css";
import "../assets/css/userinfo.css";
// import userService from '../services/user.js';
import { Redirect, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col, Table, Modal, Form, Button } from 'react-bootstrap';
import JobCard from './JobCard'
import {useState, useEffect} from 'react'
import userService from '../services/user.js';

function Profile() {

  //this is used to set the display style of job-card-modal
  const [modalDisplay, setModalDisplay] = useState('none')

  const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

  const [user, setUser] = useState({
    user: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      address: "",
      city: "",
      postCode: "",
      DOB: "",
      bio: ""
    },
    ownedFavours:[{}],
    operatedFavours:[{}]
  })

  useEffect(() => {          
      userService.profile().then(objects => { 
        console.log(objects)
        setUser( objects )
        if(objects) {
          setUpdatedUser(objects.user)
        }
      })
  }, [setUser])

  const updateProfile = () => {
    userService.account_update(updatedUser).then(updated => {
      handleClose()
      console.log("UPDATED: ", updated)
      console.log("USER: ", user)
      setUser({user: updated.updatedUser, ownedFavours: user.ownedFavours, operatedFavours: user.operatedFavours})
      console.log(user)
      
    })
  }

  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postCode: "",
    DOB: "",
    bio: ""
  });

  const handleChangeUpdate = (name) => (event) => {
    setUpdatedUser({ ...updatedUser, error: false, [name]: event.target.value });
  };



  //dummy job to test out JobCard component.
  const dummyJob = {
    ownerID: 'Leon',
    description: 'Using a shovel, you must dig me a giant hole.',
    title: 'Dig me a hole',
    status: 0,
    cost: 3,
    operatorID: null,
    city: 'Sydney',
    streetAddress: '42 Milky Way, Ryde 2650 NSW',
  }

  //can be moved elsewhere and redone as a component.
  const showJob = (e) => {
    e.preventDefault()
    console.log('showJob Click')
    setModalDisplay('block')
  }

  //can be moved elsewhere and redone as a component.
  const closeJob = (e) => {
    e.preventDefault()
    console.log('closeJob Click')
    setModalDisplay('none')
  }

  //test redirect to job page
  const goToJob = (e) => {
    e.preventDefault()

  }

  if (!userService.isAuthenticated()) {
    return (
      <Redirect to="/login"></Redirect>
    )
  }

  if (!user || !user.user || !user.user.email) { //No Profile
    return (
      <h1>Loading...</h1>
    )
  }  else {

  return (
    <div>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="text-center">
          <img alt="" src={"https://robohash.org/" + user.user.email}></img>
          <p>{user.user.email}</p>
          <Button variant="warning" onClick={(e)=> handleShow()}>Edit Profile</Button>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <div>
          <h3>Happy to see you {user.user.firstName} {user.user.lastName}!</h3>
            <Table bordered>
              <thead>
                <tr>
                  {/* <th>Skills</th> */}
                  <th>Bio</th>
                  {/* <th>Stats</th> */}
                </tr>
              </thead>
              <tbody>
                <tr height="200em">
                  {/* <td>This is some text about the users skills</td> */}
                  <td>{user.user.bio}</td>
                  {/* <td>This is some text about the user Stats</td> */}
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <h5>Jobs</h5>
      <Link to="/job/new"><button className="btn btn-primary"> + Add </button></Link>
      <Table bordered hover striped>
        <thead>
          <tr>
            <th>Job</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Listed By</th>
            <th>Completed By</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {user.ownedFavours.map(favour =>           

          <tr onClick={showJob}>
            <td>{favour.title}</td>
            <td>{favour.cost + " Tokens"}</td>
            <td>{favour.status}</td>
            <td>{favour.ownerName}</td>
            <td>{favour.operatorName}</td>
            <td>{"03/09/21"}</td>
          </tr>
          )}
          {user.operatedFavours.map(favour =>           
            <tr onClick={showJob}>
              <td>{favour.title}</td>
              <td>{favour.cost + " Tokens"}</td>
              <td>{favour.status}</td>
              <td>{favour.ownerID}</td>
              <td>{favour.operatorID}</td>
              <td>{"03/09/21"}</td>
            </tr>
            )}
        </tbody>
      </Table>
      <br></br>
      <br></br>

      {/* <div className = 'job-card-modal' style = {{
        display: modalDisplay,
      }}>
        <JobCard jobID = {dummyJob} hideJob = {closeJob}/>
      </div> */}

        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={updatedUser.email} onChange={handleChangeUpdate("email")}/>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="username" placeholder="Username" value={updatedUser.username} onChange={handleChangeUpdate("username")}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="firstname" placeholder="Username" value={updatedUser.firstName} onChange={handleChangeUpdate("firstName")}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="lastname" placeholder="Username" value={updatedUser.lastName} onChange={handleChangeUpdate("lastName")}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control type="dob" placeholder="DD/MM/YYYY" value={updatedUser.DOB} onChange={handleChangeUpdate("DOB")}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="address" placeholder="Address" value={updatedUser.address} onChange={handleChangeUpdate("address")}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="city" placeholder="City" value={updatedUser.city} onChange={handleChangeUpdate("city")}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Postcode</Form.Label>
                  <Form.Control type="postcode" placeholder="Postcode" value={updatedUser.postCode} onChange={handleChangeUpdate("postCode")}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control type="bio" placeholder="Bio" value={updatedUser.bio} onChange={handleChangeUpdate("bio")}/>
                </Form.Group>
                
                


              
              </Form>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={updateProfile}>Update</Button>
            </Modal.Footer>
      </Modal>


    </div>
  )
  }
}


export default Profile
