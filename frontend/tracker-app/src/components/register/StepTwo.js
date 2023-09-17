import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../../redux/userSlice";
import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const StepTwo = () => {
  const user = useSelector(e => e.user.value);
  const dispatch = useDispatch();
  const refAge = useRef();
  const refHeight = useRef();
  const refWeight = useRef();
  const refTimezone = useRef();

  const [account, setAcc] = useState({
    age: "",
    height: "",
    weight: "",
    timezone: "",
  });

  const [sex, setSex] = useState({
    male: false,
    female: false
  });

  useEffect(() => {
    switch (user.sex) {
      case "male":
        setSex({ male: true, female: false });
        break;
      case "female":
        setSex({ male: false, female: true });
        break;
    }
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    var x = 0;
    var selectedSex
    Object.values(sex).map((e, i) => { if (e === true) x = i; });
    Object.keys(sex).map((e, i) => { if (i === x) selectedSex = e; });

    dispatch(info({ ...user, sex: selectedSex }));
    //eslint-disable-next-line
  }, [user.nextClick, sex]);

  useEffect(() => {
    refAge.current.value = user.age;
    // refHeight.current.value = user.height;
    // refWeight.current.value = user.weight;
    // refTimezone.current.value = user.timezone;

    dispatch(info({
      ...user, age: refAge.current.value//, height: refHeight.current.value, weight: refWeight.current.value, timezone: refTimezone.current.value}));
      //eslint-disable-next-line
    }))
  }, [])


  useEffect(() => {
    dispatch(info({
      ...user, age: refAge.current.value //, height: refHeight.current.value, weight: refWeight.current.value, timezone: refTimezone.current.value}));
      //eslint-disable-next-line
    }))
  }, [account.age, account.height, account.weight, account.timezone]);


  

  const AGE_REGEX = /^(?:1[01][0-9]|120|1[3-9]|[2-9][0-9])$/
  const EMPTY_REGEX = /male/

  const checked = e => {
    return EMPTY_REGEX.test(e);
  }
  
  const validAge = e => {
    return AGE_REGEX.test(e);
  }

  return (
    <div className="info">
      <h2>User Details</h2>
      {/* <p>All fields are required</p> */}
      <div className="form">
        <Row>
          <Col>
            <div className="details dflex">
              <Form.Label>
                Sex
              </Form.Label>
            </div>
            <div className="details">
              <Form.Label>
                <input type="radio" label="Male" value="Male" name="option" onClick={() => setSex({ male: true, female: false })} />
                &nbsp;&nbsp;Male</Form.Label>

              <Form.Label style={{ paddingLeft: 20 }}>
                <input type="radio" label="Female" value="Female" name="option" onClick={() => setSex({ male: false, female: true })} />
                &nbsp;&nbsp;Female</Form.Label>
            </div>
          </Col>
          <Col>
            <div className="details">
              <div className="fields">
                <div className="details dflex">
                <Form.Label>
                Age
              </Form.Label>
                  {user.nextClick && (
                    <span>{user.age === "" ? "This field is required" : !validAge(user.age)}</span>
                  )}
                </div>
                <Form.Control
                  required
                  type="text"
                  ref={refAge}
                  autoComplete="off"
                  className={!validAge(user.age) && user.nextClick ? "erorr" : ""}
                  onChange={e => setAcc({ ...account, age: e.target.value })}
                />

                <Form.Text id="uidnote" className={user.age && validAge(user.age) ? "offscreen" : "instructions"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must be 13 years or older.
                </Form.Text>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          
        <Col>
            <div className="details">
              <div className="fields">
                <div className="details dflex">
                <Form.Label>
                Height
              </Form.Label>
                  {/* {user.nextClick && (
                    <span>{user.height === "" ? "This field is required" : !validHeight(user.height)}</span>
                  )} */}
                </div>
                <Form.Control
                  required
                  type="text"
                  ref={refHeight}
                  autoComplete="off"
                  placeholder="in."
                  // className={!validHeight(user.height) && user.nextClick ? "erorr" : ""}
                  // onChange={e => setAcc({ ...account, height: e.target.value })}
                />

              </div>
            </div>
          </Col>
          <Col>
            <div className="details">
              <div className="fields">
                <div className="details dflex">
                <Form.Label>
                Weight
              </Form.Label>
                  {/* {user.nextClick && (
                    <span>{user.weight === "" ? "This field is required" : !validWeight(user.weight)}</span>
                  )} */}
                </div>
                <Form.Control
                  required
                  type="text"
                  ref={refWeight}
                  autoComplete="off"
                  placeholder="lbs"
                  // className={!validWeight(user.weight) && user.nextClick ? "erorr" : ""}
                  // onChange={e => setAcc({ ...account, weight: e.target.value })}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {/* Timezone */}
        </Row>
      </div>
    </div>
  );
};

export default StepTwo;
