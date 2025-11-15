const BaseModel = require('../../../../../config/basemodel/baseModel');

const CooperativeModel = new BaseModel('cooperatives', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'name VARCHAR(100) UNIQUE NOT NULL',
  'cooperative_type VARCHAR(50) NOT NULL',
  'location VARCHAR(255) NOT NULL',
  'farmer_count INT NOT NULL',
  'created_at TIMESTAMP DEFAULT NOW()',
]); 

module.exports = CooperativeModel;