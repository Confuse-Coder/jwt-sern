import './Register.scss';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';
const Register = (props) => {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckValid, setObjCheckValid] = useState(defaultValidInput);

  let history = useHistory();
  const handleLogin = () => {
    history.push('/login');
  };

  useEffect(() => {
    if (user && user.isAuthenticated) {
      history.push('/');
    }
  }, []);

  const isValidInputs = () => {
    setObjCheckValid(defaultValidInput);

    if (!email) {
      toast.error('Your Email is required!');
      setObjCheckValid({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      setObjCheckValid({ ...defaultValidInput, isValidEmail: false });
      toast.error('Please enter a valid your email!');
      return false;
    }
    if (!phone) {
      setObjCheckValid({ ...defaultValidInput, isValidPhone: false });
      toast.error('Your Phone is required!');
      return false;
    }
    if (!password) {
      setObjCheckValid({ ...defaultValidInput, isValidPassword: false });
      toast.error('Your Password is required!');
      return false;
    }
    if (password != confirmPassword) {
      setObjCheckValid({ ...defaultValidInput, isValidConfirmPassword: false });
      toast.error('Your password is not the same!');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidInputs();

    if (check === true) {
      let serverData = await registerNewUser(email, phone, username, password);
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push('/login');
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">
              <Link to="/">
                {' '}
                <span title="Return to Homepage">Too Huynh</span>
              </Link>
            </div>
            <div className="detail">Nothing is Impossible!</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-2 py-3">
            <div className="brand d-sm-none">Too Huynh</div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className={objCheckValid.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                className={objCheckValid.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                placeholder="Phone Number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="User Name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={
                  objCheckValid.isValidPassword ? 'form-control' : 'form-control is-invalid'
                }
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter Password</label>
              <input
                type="password"
                className={
                  objCheckValid.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'
                }
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button type="button" className="btn btn-primary" onClick={() => handleRegister()}>
              Register
            </button>

            <hr />
            <div className="text-center">
              <button type="button" className="btn btn-secondary" onClick={() => handleLogin()}>
                Already've an account. Login
              </button>
              <div className="mt-3 return">
                <Link to="/">
                  <i className="fa fa-arrow-circle-left"></i>
                  <span title="Return to Homepage">Return to Homepage</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
