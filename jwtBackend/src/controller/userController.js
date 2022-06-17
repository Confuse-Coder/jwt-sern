import userApiService from '../service/userApiService';

const readFunc = async (req, res) => {
  try {
    let data = await userApiService.getAllUsers();

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: 'error from server',
      EC: '-1',
      DT: '',
    });
  }
};
const createFunc = async (req, res) => {
  try {
    let users = await userApiService.getAllUsers();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: 'error from server',
      EC: '-1',
      DT: '',
    });
  }
};
const updateFunc = async (req, res) => {
  try {
    let users = await userApiService.getAllUsers();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: 'error from server',
      EC: '-1',
      DT: '',
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
    let users = await userApiService.getAllUsers();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: 'error from server',
      EC: '-1',
      DT: '',
    });
  }
};

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
