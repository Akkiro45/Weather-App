const getUser = (id, callback) => {
  const user = {
    id,
    name: 'rohit'
  }
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(8, (user) => {
  console.log(user);
});
