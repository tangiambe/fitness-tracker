import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { back, next } from '../../redux/page'
import { info } from '../../redux/userSlice'


const NavButton = () => {
  const page=useSelector((e)=>e.page.value);
  const user=useSelector(e=>e.user.value)
  const dispatch=useDispatch();
  const nextClick=()=>{
    console.log(user)
    dispatch(info({...user,nextClick:true}));
    if(user.emailValid && user.username.length>2 && page==0){
      dispatch(next());
      dispatch(info({...user,nextClick:false}))
    }
    if(page!=0){
      dispatch(next());
    }
    
  }
  return (
    <div className={page==0?'navigation btnRight':'navigation'}>
      {page!=0 &&<button className='btn1' onClick={()=>dispatch(back())}>Go Back</button>}
      <button className='btn2'onClick={nextClick}>{page==3?"Create Account":"Next"}</button>
    </div>
  )
}

export default NavButton