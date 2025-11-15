// models/User.js
class User {
  constructor({
    id,
    email,
    phone_number,
    full_name,
    role,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.email = email;
    this.phone_number = phone_number;
    this.full_name = full_name;
    this.role = role;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = User;
