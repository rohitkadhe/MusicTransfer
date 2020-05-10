//User model
const User = (id = undefined, email, password, name) => {
  return {
    id,
    email,
    password,
    name,
  };
};
module.exports = User;
