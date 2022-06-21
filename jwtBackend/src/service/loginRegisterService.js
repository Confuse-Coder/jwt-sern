require('dotenv').config();
import db from '../models/index';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { getGroupWithRoles } from '../service/JWTService';
import { createJWT } from '../middleware/JWTActions';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }

  return false;
};

const checkPhonelExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });

  if (user) {
    return true;
  }

  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    //check email/phone/password are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: 'The email is already existed!',
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhonelExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: 'The phone number is already existed!',
        EC: 1,
      };
    }

    //hash user password
    let hashPassword = hashUserPassword(rawUserData.password);

    //create new user
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPassword,
      phone: rawUserData.phone,
      groupId: 4,
    });

    return {
      EM: 'A user is created successfully',
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: 'Something wrong in service!',
      EC: -2,
    };
  }
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });

    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        //test role
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          groupWithRoles,
          username: user.username,
        };
        let token = createJWT(payload);
        return {
          EM: 'ok!',
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            email: user.email,
            username: user.username,
          },
        };
      }
    }

    return {
      EM: 'Your Email/PhoneNumber or password is incorrect!',
      EC: 1,
      DT: '',
    };

    // if (isPhoneExist === true) {
    //   return {
    //     EM: 'The phone number is already existed!',
    //     EC: 1,
    //     DT:''

    //   };
    // }
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrong in service!',
      EC: -2,
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
  hashUserPassword,
  checkPhonelExist,
  checkEmailExist,
};
