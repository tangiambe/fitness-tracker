import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../../redux/userSlice";
import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const StepOne = () => {

  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);

  const refFname = useRef();
  const refLname = useRef();
  const refUsername = useRef();
  const refEmail = useRef();
  const refPwd = useRef();

  const [account, setAcc] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: ""
  });

  /* Username */
  // const [validUsername, setValidUsername] = useState(false);

  /* Email */
  const [emailFocus, setEmailFocus] = useState(false);

  /* Password */
  // const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  /* Confirm Password */
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [confPasswordShown, setConfPasswordShown] = useState(false);
  const toggleConfPasswordVisiblity = () => {
    setConfPasswordShown(confPasswordShown ? false : true);
  };

  /* Regular Expressions for Input Validation */
  const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  const validUsername = e => {
    return USERNAME_REGEX.test(e);
  }


  const validEmail = e => {
    return EMAIL_REGEX.test(e);
  };

  const validPwd = e => {
    return PWD_REGEX.test(e);
  }



  useEffect(() => {
    dispatch(info({ ...user, fname: refFname.current.value, lname: refLname.current.value, username: refUsername.current.value, email: refEmail.current.value, password: refPwd.current.value }));
    //eslint-disable-next-line
  }, [account.fname, account.lname, account.username, account.email, account.password]);




  useEffect(() => {
    refFname.current.value = user.fname;
    refLname.current.value = user.lname;
    refUsername.current.value = user.username;
    refEmail.current.value = user.email;
    refPwd.current.value = user.password;

    dispatch(info({ ...user, fname: refFname.current.value, lname: refLname.current.value, username: refUsername.current.value, email: refEmail.current.value, password: refPwd.current.value }));
    //eslint-disable-next-line
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
            <Form.Group className="fields">
              <div className="dflex">
                <Form.Label>
                  Username
                  <FontAwesomeIcon icon={faCheck} className={validUsername(user.username) ? "valid" : "hide"} />
                </Form.Label>
                {user.nextClick && (
                  <span>{user.username === "" ? "This field is required" :
                    !validUsername(user.username) &&
                    <FontAwesomeIcon icon={faTimes} className={"invalid"} />
                  }</span>
                )}
              </div>
              <Form.Control
                required
                type="text"
                ref={refUsername}
                autoComplete="off"
                placeholder="Enter a username"
                aria-invalid={validUsername ? "false" : "true"}
                aria-describedby="uidnote"
                className={!validUsername(user.username) && user.nextClick ? "erorr" : ""}
                onChange={e => setAcc({ ...account, username: e.target.value })}
              />

              <Form.Text id="uidnote" className={user.username && validUsername(user.username) ? "offscreen" : "instructions"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </Form.Text>

            </Form.Group>
          </Col>

          <Col>
            <div className="fields">
              <div className="dflex">
                <label>Email Address</label>
                {/* {!user.validEmail && user.nextClick && (
                  <span>
                    {user.email === ""
                      ? "This field is required"
                      : "Invalid Email Address"}
                  </span>
                )} */}
              </div>
              <input
                type="text" ref={refEmail}
                inputMode="email"
                placeholder="Enter an email address"
                // className={!user.validEmail && user.nextClick ? "erorr" : ""}
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
                type="text" ref={refPwd}
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
                type="text" ref={refPwd}
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
