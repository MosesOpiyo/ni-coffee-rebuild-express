const BaseRepository = require('../../../../config/baseRepository/baseRepository')
const UserModel = require('../User/authModels');

class UserRepository extends BaseRepository {
    constructor(data) {
        super('users', UserModel);
    }
}

module.exports = new UserRepository();
