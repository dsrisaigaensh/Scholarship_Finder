const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scholarshipfinder';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Admin schema
const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  fullName: String,
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
  logins: { type: Number, default: 0 },
});

const Admin = mongoose.model('Admin', adminSchema);

async function setupAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@example.com');
      console.log('Password: hashedpassword123');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('hashedpassword123', 10);
    
    const admin = new Admin({
      username: 'adminuser',
      email: 'admin@example.com',
      password: hashedPassword,
      fullName: 'Admin User',
      role: 'superadmin',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await admin.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: hashedpassword123');
    console.log('Role: superadmin');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the setup
setupAdmin(); 