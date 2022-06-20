import loginRegisterService from '../service/loginRegisterService';

const handleRegister = async (req, res) => {
  try {
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: 'Missing required parameters!',
        EC: 1,
      });
    }
    if (req.body.password && req.body.password < 4) {
      return res.status(200).json({
        EM: 'Your password must have more than 3 letters!',
        EC: 1,
      });
    }

    let data = await loginRegisterService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: 'error from server!',
      EC: -1,
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    //set cookie
    if (data & data.DT && data.DT.access_token) {
      res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    }

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: 'error from server!',
      EC: -1,
      DT: '',
    });
  }

  loginRegisterService.handleUserLogin(req.body);
};

module.exports = { handleRegister, handleLogin };
