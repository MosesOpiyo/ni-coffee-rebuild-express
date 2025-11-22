const BaseModel  = require('../../../../config/basemodel/baseModel');

class UserModel extends BaseModel{
  constructor(data = {}){
    super("users", [
      "id UUID PRIMARY KEY DEFAULT gen_random_uuid()",
      "full_name VARCHAR(100) NOT NULL",
      "phone_number VARCHAR(15) UNIQUE",
      "email VARCHAR(100) UNIQUE NOT NULL",
      "role VARCHAR(50) DEFAULT 'user'"
    ]);
    Object.assign(this, data);
  }

  toJSON() {
    // You can choose to return all properties or selectively
    return {
      id: this.id,
      full_name: this.full_name,
      phone_number: this.phone_number,
      email: this.email,
      role: this.role,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = UserModel;