
const { UserModel } = require("./src/model/user.model");
const { getUsers, insertUser, updateUser, getUserById } = require("./src/repository/user.repository");

async function main() {
  const result = await insertUser(new UserModel(null, 'leonel', 'sudo', 'juan@email.com', '12345', 1, new Date(), new Date()))
  console.log('Resultado', result);
  const data = await getUsers();
  console.log(data.find(item => {
    return item.userId == 1;
  }))
  const id = 5
  // const ddd = await getUserById(id)
  await updateUser(new UserModel(id, 'juan leonel', 'a..', 'juan@gmail.com', null, 1, null, null))
  // const ddd2 = await getUserById(id)
}

main()
