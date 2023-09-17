import React, { useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { info } from "../../redux/userSlice";
import Row from 'react-bootstrap/Row';



const Level = ({title, description, selected}) => {
  return (
    <div className={selected?'planCard planClick':'planCard'}>
        <div className='title'>
            <h3>{title}</h3>
            <p>{description}</p>
        </div> 
    </div>
  )
}


const StepThree = () => {
  const user=useSelector(e=>e.user.value);
  const dispatch=useDispatch();
  
  const [level, setLevel] = useState({
    none: false, 
    light: false,
    moderate: false,
    very: false,
    super: false,
  });

  useEffect(()=>{
    switch(user.level){
      case "none":
        setLevel({none: true, light: false, moderate: false, very: false, super: false});
        break;
      case "light":
        setLevel({none:false, light:true, moderate:false, very: false, super: false});
        break;
      case "moderate":
        setLevel({none: false, light: false, moderate: true, very: false, super: false});
        break;
      case "very":
        setLevel({none: false, light: false, moderate: false, very: true, super: false});
        break;
      case "super":
        setLevel({none: false, light: false, moderate: false, very: false, super: true});
        break;
      // default:
      //   setLevel({none: false, light: false, moderate: false, very: false, super: false});
      //   break;  
    }
    //eslint-disable-next-line
  },[])

  useEffect(() => {
    var x = 0;
    var activityLevel
    Object.values(level).map((e, i) => { if (e === true) x = i; });
    Object.keys(level).map((e, i) => { if (i === x) activityLevel = e; });
    
    dispatch(info({ ...user, level: activityLevel }));
    //eslint-disable-next-line
  }, [user.nextClick, level]);  



  return (
    <div className="Plan info">
      <h2>Activity Level</h2>
      <p>Choose a level that best describes your physical activity every day.</p>
      <div className="plansCrads">
        
        <Row onClick={()=>setLevel({none: true, light: false, moderate: false, very: false, super: false})}>
          <Level
            title={"None"}
            description={"Sedentary or no exercise"}
            selected={level.none}
          />
        </Row>

        <Row onClick={()=>setLevel({none:false, light:true, moderate:false, very: false, super: false})}>
          <Level
            title={"Light"}
            description={"Light exercise or sports 1-3 days a week"}
            selected={level.light}
          />
        </Row>

        <Row onClick={()=>setLevel({none: false, light: false, moderate: true, very: false, super: false})}>
          <Level
            title={"Moderate"}
            description={"Moderate exercise or sports 3-5 days a week"}
            selected={level.moderate}
          />
        </Row>

        <Row onClick={()=>setLevel({none: false, light: false, moderate: false, very: true, super: false})}>
          <Level
            title={"Heavy"}
            description={"Hard exercise or sports 6-7 days a week"}
            selected={level.very}
          />
        </Row>

        <Row onClick={()=>setLevel({none: false, light: false, moderate: false, very: false, super: true})}>
          <Level
            title={"Athlete"}
            description={"Very hard exercise, physical job, or training twice a day"}
            selected={level.super}
          />
        </Row>

      </div>
    </div>
  );
};

export default StepThree;
