import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { back, next } from '../../redux/page'
import { info } from '../../redux/userSlice'



const NavButton = () => {
  const page = useSelector((e) => e.page.value);
  const user = useSelector(e => e.user.value)
  const dispatch = useDispatch();

  const nextClick = () => {
    console.log(user)
    dispatch(info({ ...user, nextClick: true }));
    if (user.username.length > 3 && page === 0) {
      dispatch(next());
      dispatch(info({ ...user, nextClick: false }))
    } else if (user.sex.length > 3 && page === 1) {
      dispatch(next());
      dispatch(info({ ...user, nextClick: false }))
    } else if (user.level.length > 0 && page === 2) {
      dispatch(next());
      dispatch(info({ ...user, nextClick: false }))
    } else if (user.goal.length > 0 && page === 3) {
      dispatch(next());
      dispatch(info({ ...user, nextClick: false }))
    }
  }
  return (
    <div className='navigation btnRight'>
      {page !== 0 && <button className='btn1' onClick={() => dispatch(back())}>Go Back</button>}
      <button className='btn2' onClick={nextClick}>{page === 3 ? "Create Account" : "Next"}</button>
    </div>
  )
}

export default NavButton