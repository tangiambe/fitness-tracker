import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { back, next } from '../../redux/page';
import { info } from '../../redux/userSlice';

const NavButton = () => {
  const page = useSelector((e) => e.page.value);
  const user = useSelector((e) => e.user.value);
  const dispatch = useDispatch();

  const nextClick = () => {
    console.log(user);
    dispatch(info({ ...user, nextClick: true }));

    if (user.username.length > 3 && page === 0) {
      dispatch(next());
      dispatch(info({ ...user, nextClick: false }));
    }

    if (page !== 0) {
      dispatch(next());

      // Call handleApiResponse when page is 3
      // if (page === 3) {
      //   // Call RegistrationApi with user data and the callback
      //   RegistrationApi(user, handleApiResponse);
     // }
    }
  };

  return (
    <div className="navigation btnRight">
      {page !== 0 && (
        <button className="btn1" onClick={() => dispatch(back())}>
          Go Back
        </button>
      )}
      <button className="btn2" onClick={nextClick}>
        {page === 3 ? 'Create Account' : 'Next'}
      </button>
    </div>
  );
};

export default NavButton;
