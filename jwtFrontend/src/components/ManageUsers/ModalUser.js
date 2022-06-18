import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { fetchGroup, createNewUser } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { Default } from 'react-toastify/dist/utils';

const ModalUser = (props) => {
  const defaulUserData = {
    email: '',
    phone: '',
    username: '',
    password: '',
    address: '',
    sex: '',
    group: '',
  };

  const validInputsDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaulUserData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);
  const [userGroups, setUserGroups] = useState([]);
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.data.EC === 0) {
      setUserGroups(res.data.DT);
      if (res.data.DT && res.data.DT.length > 0) {
        let groups = res.data.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.data.EM);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInputs = () => {
    setValidInputs(validInputsDefault);

    let arr = ['email', 'phone', 'password', 'group'];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty Input: ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirmUser = async () => {
    //create user
    let check = checkValidateInputs();
    if (check === true) {
      let res = await createNewUser({ ...userData, groupId: userData['group'] });
      if (res.data && res.data.EC === 0) {
        props.onHide();
        setUserData({ ...defaulUserData, group: userGroups[0].id });
      } else {
        toast.error('Error Create User!');
      }
    }
  };

  return (
    <>
      <Modal size="lg" show={props.show} className="modal-user" onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>{props.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email address (<span className="red">*</span>)
              </label>
              <input
                type="email"
                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                value={userData.email}
                onChange={(event) => handleOnChangeInput(event.target.value, 'email')}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone Number (<span className="red">*</span>)
              </label>
              <input
                type="phone"
                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                value={userData.phone}
                onChange={(event) => handleOnChangeInput(event.target.value, 'phone')}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={userData.username}
                onChange={(event) => handleOnChangeInput(event.target.value, 'username')}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password (<span className="red">*</span>)
              </label>
              <input
                type="password"
                className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                value={userData.password}
                onChange={(event) => handleOnChangeInput(event.target.value, 'password')}
              />
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                value={userData.address}
                onChange={(event) => handleOnChangeInput(event.target.value, 'address')}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender</label>
              <select
                className="form-select"
                onChange={(event) => handleOnChangeInput(event.target.value, 'sex')}
              >
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group (<span className="red">*</span>)
              </label>
              <select
                className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                onChange={(event) => handleOnChangeInput(event.target.value, 'group')}
              >
                {userGroups &&
                  userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
