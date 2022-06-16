import './Register.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const Register = (props) => {
  let history = useHistory();

  const handleLogin = () => {
    history.push('/login');
  };

  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=2').then((data) => {
      console.log('>>> check data axios', data);
    });
  });

  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">Too Huynh</div>
            <div className="detail">Nothing is Impossible!</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-2 py-3">
            <div className="brand d-sm-none">Too Huynh</div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control" placeholder="Email address" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" className="form-control" placeholder="Phone Number" />
            </div>
            <div className="form-group">
              <label>User Name</label>
              <input type="text" className="form-control" placeholder="User Name" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
              <label>Re-enter Password</label>
              <input type="password" className="form-control" placeholder="Re-enter Password" />
            </div>

            <button className="btn btn-primary">Register</button>

            <hr />
            <div className="text-center">
              <button className="btn btn-secondary" onClick={() => handleLogin()}>
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
