const BaseModel  = require('../../../../config/basemodel/baseModel');

const UserModel = new BaseModel("users", [
  "id UUID PRIMARY KEY DEFAULT gen_random_uuid()",
  "full_name VARCHAR(100) NOT NULL",
  "phone_number VARCHAR(15) UNIQUE",
  "email VARCHAR(100) UNIQUE NOT NULL",
  "role VARCHAR(50) DEFAULT 'user'",
  "created_at TIMESTAMP DEFAULT NOW()",
  "updated_at TIMESTAMP DEFAULT NOW()"
]);

module.exports = UserModel;