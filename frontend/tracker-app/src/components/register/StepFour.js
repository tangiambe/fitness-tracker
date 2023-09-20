import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../../redux/userSlice";



const Goal = ({ title, description, selected }) => {
  return (
    <div className={selected ? 'goalCard goalClick' : 'goalCard'}>
      <div className='title'>
        <h2>{title}</h2>
        <hr></hr>
        <h3>{description}</h3>
      </div>
    </div>
  )
}


const StepFour = () => {
  const user = useSelector(e => e.user.value);

  const [goal, setGoal] = useState({
    lose: false,
    maintain: false,
    gain: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {

    switch (user.goal) {
      case "maintain":
        setGoal({ lose: false, maintain: true, gain: false });
        break;
      case "gain":
        setGoal({ lose: false, maintain: false, gain: true });
        break;
    }
    //eslint-disable-next-line
  }, [])
  useEffect(() => {
    var t = 0;
    var userGoal;
    Object.values(goal).map((e, i) => { if (e === true) t = i; });
    Object.keys(goal).map((e, i) => { if (i === t) userGoal = e; });

    dispatch(info({ ...user, goal: userGoal }));
    //eslint-disable-next-line
  }, [user.nextClick, goal]);


  return (
    <div className="Goal info">
      <h2>Last thing, <span>{user.fname}</span>! What is your main goal?</h2>
      <p>Select an option that most closely fits your health and fitness goals!</p>
      <div className="goalsCrads">
        <div onClick={() => setGoal({ lose: true, maintain: false, gain: false, })}>
          <Goal
            title={"Lose"}
            description={"Lose 1 lb/week"}
            selected={goal.lose}
          />
        </div>
        <div onClick={() => setGoal({ lose: false, maintain: true, gain: false, })}>
          <Goal
            title={"Maintain"}
            description={"Keep current weight"}
            selected={goal.maintain}
          />
        </div>
        <div onClick={() => setGoal({ lose: false, maintain: false, gain: true, })}>
          <Goal
            title={"Gain"}
            description={"Gain 1 lb/week"}
            selected={goal.gain}
          />
        </div>
      </div>
    </div>
  );
};

export default StepFour;
