import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../../redux/userSlice";
import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const StepOne = () => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);
  
  const [account, setAcc] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: ""
  });
  
  const emailval = e => {
    const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return EMAIL_REGEX.test(e);
  };

  const refFname = useRef();
  const refLname = useRef();
  const refUsername = useRef();
  const refEmail = useRef();
  const refPw = useRef();


  useEffect(() => {
    dispatch(info({ ...user, fname: refFname.current.value, lname: refLname.current.value, username: refUsername.current.value, email: refEmail.current.value, emailValid: emailval(refEmail.current.value) }));
  }, [account.username, account.email]);




  useEffect(() => {
    refUsername.current.value = user.username;
    refEmail.current.value = user.email;

    dispatch(info({ ...user, username: refUsername.current.value, email: refEmail.current.value, emailValid: emailval(refEmail.current.value) }));

  }, [])


  return (
    <div className="info">
      <h2>Account Info</h2>
      <Form className="form" autoComplete="on">
        <Row>

          <Col>
            <div className="fields">
              <div className="dflex">
                <label>First Name</label>
                {user.nextClick && (
                  <span>{user.fname.length < 0 && "This field is required"}</span>
                )}
              </div>
              <input
                type="text" ref={refFname} autoComplete="on"
                placeholder="First Name"
                className={user.fname.length < 0 && user.nextClick ? "erorr" : ""}
                onChange={e => setAcc({ ...account, fname: e.target.value })}
              />
            </div>
          </Col>

          <Col>
            <div className="fields">
              <div className="dflex">
                <label>Last Name</label>
                {user.nextClick && (
                  <span>{user.lname.length < 0 && "This field is required"}</span>
                )}
              </div>
              <input
                type="text" ref={refLname} autoComplete="on"
                placeholder="Last Name"
                className={user.lname.length < 0 && user.nextClick ? "erorr" : ""}
                onChange={e => setAcc({ ...account, lname: e.target.value })}
              />
            </div>
          </Col>

        </Row>

        <Row>

          <Col>
            <div className="fields">
              <div className="dflex">
                <label>Username</label>
                {user.nextClick && (
                  <span>{user.username.length < 3 && "This field is required"}</span>
                )}
              </div>
              <input
                type="text" ref={refUsername} autoComplete="on"
                placeholder="Enter a username"
                className={user.username.length < 3 && user.nextClick ? "erorr" : ""}
                onChange={e => setAcc({ ...account, username: e.target.value })}
              />
            </div>
          </Col>

          <Col>
            <div className="fields">
              <div className="dflex">
                <label>Email Address</label>
                {!user.emailValid && user.nextClick && (
                  <span>
                    {user.email == ""
                      ? "This field is required"
                      : "Invalid Email Address"}
                  </span>
                )}
              </div>
              <input
                type="text" ref={refEmail}
                inputMode="email"
                placeholder="Enter an email address"
                className={!user.emailValid && user.nextClick ? "erorr" : ""}
                onChange={e => setAcc({ ...account, email: e.target.value })}
              />
            </div>
          </Col>

        </Row>

        <Row>
          
          <Col>
            <div className="fields">
              <div className="dflex">
                <label>Password</label>
                {user.nextClick && (
                  <span>{user.password.length < 3 && "This field is required"}</span>
                )}
              </div>
              <input
                type="text" ref={refPw}
                // inputMode="email"
                placeholder="Password"
                // className={user.nextClick ? "erorr" : ""}
                onChange={e => setAcc({ ...account, password: e.target.value })}
              />
            </div>
          </Col>
         
          <Col>
            <div className="fields">
            <div className="dflex">
                <label>Password</label>
                {user.nextClick && (
                  <span>{user.password.length < 3 && "This field is required"}</span>
                )}
              </div>
              <input
                type="text" ref={refPw}
                // inputMode="email"
                placeholder="Password"
                // className={user.nextClick ? "erorr" : ""}
                onChange={e => setAcc({ ...account, password: e.target.value })}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StepOne;
