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
  const NAME_REGEX = /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u01FF]+([ \-']{0,1}[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u01FF]+){0,2}[.]{0,1}$/

  const validName = e => {
    return NAME_REGEX.test(e);
  }

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
                <FontAwesomeIcon icon={faCheck} className={validName(user.fname) ? "valid" : "hide"} />
                {user.nextClick && (
                  <span>{user.fname === "" ? "This field is required" :
                    !validName(user.fname) &&
                    <FontAwesomeIcon icon={faTimes} className={"invalid"} />
                  }</span>
                )}
              </div>
              <Form.Control
                required
                type="text"
                ref={refFname}
                autoComplete="off"
                placeholder="Enter First Name"
                className={!validName(user.fname) && user.nextClick ? "erorr" : ""}
                onChange={e => setAcc({ ...account, fname: e.target.value })}
              />
            </div>
          </Col>
          <Col>
            <div className="fields">
              <div className="dflex">
                <label>Last Name</label>
                <FontAwesomeIcon icon={faCheck} className={validName(user.lname) ? "valid" : "hide"} />
                {user.nextClick && (
                  <span>{user.lname === "" ? "This field is required" :
                    !validName(user.lname) &&
                    <FontAwesomeIcon icon={faTimes} className={"invalid"} />
                  }</span>
                )}
              </div>
              <Form.Control
                required
                type="text"
                ref={refLname}
                autoComplete="off"
                placeholder="Enter Last Name"
                className={!validName(user.lname) && user.nextClick ? "erorr" : ""}
                onChange={e => setAcc({ ...account, lname: e.target.value })}
              />
            </div>
          </Col>
        </Row>

        <Row>

          <Col>
            <div className="fields">
              <div className="dflex">
                <Form.Label className="user-label">
                  Username&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                className={!validUsername(user.username) && user.nextClick ? "erorr" : ""}
                onChange={e => setAcc({ ...account, username: e.target.value })}
              />

              <Form.Text id="uidnote" className={user.username && validUsername(user.username) ? "offscreen" : "instructions"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters. Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </Form.Text>

            </div>
          </Col>

          <Col>
            <div className="fields">
              <div className="dflex">
                <Form.Label>
                  Email Address
                <FontAwesomeIcon icon={faCheck} className={validEmail(user.email) ? "valid" : "hide"} />
                </Form.Label>
                {user.nextClick && (
                  <span>{user.email === "" ? "This field is required" :
                    !validEmail(user.email) &&
                    <FontAwesomeIcon icon={faTimes} className={"invalid"} />
                  }</span>
                )}
              </div>
              <Form.Control
                required
                type="email"
                ref={refEmail}
                autoComplete="off"
                placeholder="Enter Email"
                className={!validEmail(user.email) && user.nextClick ? "erorr" : ""}
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
