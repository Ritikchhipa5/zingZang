import {AUTH} from './constant';

const singInEmail = async (body: any) => {
  return await fetch(AUTH.SIGN_WITH_EMAIL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(value => {
      return value;
    })
    .catch(error => {
      console.error(error);
    });
};

const singUpEmail = async (body: any) => {
  return await fetch(AUTH.REGISTER_WITH_EMAIL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(value => {
      return value;
    })
    .catch(error => {
      console.error(error);
    });
};
export {singInEmail, singUpEmail};
