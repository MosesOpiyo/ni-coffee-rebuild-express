const UserModel = require('../../../endPoints/auth/models/User/authModels');
const { initDb,
  create,
  findAll,
  findById,
  update,
  remove } = require('../../base/baseTest');

beforeAll(async () => {
    await initDb(UserModel.getCreateTableQuery());
})


describe('Users CRUD using basetest', () => {
    let userId;

    it ('should create a user', async() => {
        const user = await create('users', {
           'full_name': 'John Doe',
           'phone_number': '+11234567890',
           'email': 'johndoe@gmail.com',
           'role': 'user' 
        })
        userId = user.id;
        expect(user.full_name).toBe('John Doe');
    })

    it('should find all users', async () => {
        const users = await findAll('users');
        expect(users.length).toBeGreaterThan(0);
    });

    it('should find a user by id', async () => {
        const user = await findById('users', userId);
        expect(user.id).toBe(userId);
    });

})
