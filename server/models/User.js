//User model
const User = (email, name, password, id) => {
  return {
    id: id,
    email: email,
    password: password,
    name,
  };
};
module.exports = User;
