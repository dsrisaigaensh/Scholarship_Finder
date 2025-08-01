require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scholarshipfinder';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected successfully');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  logins: { type: Number, default: 0 },
});
const User = mongoose.model('User', userSchema);

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

// Application schema
const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scholarship: String,
  firstName: String,
  lastName: String,
  dob: String,
  gender: String,
  contact: String,
  nationality: String,
  education: String,
  percentage: String,
  appliedAt: { type: Date, default: Date.now }
});
const Application = mongoose.model('Application', applicationSchema);

// Admin signup endpoint (for initial setup only)
app.post('/api/admin/signup', async (req, res) => {
  const { username, email, password, fullName, role } = req.body;
  const bcrypt = require('bcryptjs');
  try {
    const existing = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ error: 'Admin already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
      fullName,
      role: role ? role : 'admin', // Always set role
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await admin.save();
    res.status(201).json({ message: 'Admin created' });
  } catch (err) {
    res.status(400).json({ error: 'Error creating admin' });
  }
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ error: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  admin.logins = (admin.logins || 0) + 1;
  await admin.save();
  const token = jwt.sign({ admin: true, email: admin.email }, process.env.JWT_SECRET || 'SECRET_KEY');
  res.json({ token, name: admin.fullName, role: admin.role });
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: No user found for email', email);
      return res.status(401).json({ error: 'No account found with this email. Please sign up first.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login failed: Incorrect password for email', email);
      return res.status(401).json({ error: 'Incorrect password.' });
    }
    user.logins = (user.logins || 0) + 1;
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'SECRET_KEY');
    res.json({ token, name: user.name, userId: user._id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to receive applied scholarship details
app.post('/api/applied', async (req, res) => {
  try {
    const { scholarship, firstName, lastName, gender, mobile, extra } = req.body;
    const application = new Application({ scholarship, firstName, lastName, gender, mobile, extra });
    await application.save();
    res.status(201).json({ message: 'Application details saved' });
  } catch (err) {
    res.status(400).json({ error: 'Could not save application details' });
  }
});

// Apply for a scholarship (user-specific)
app.post('/api/apply', async (req, res) => {
  let { userId, scholarship, firstName, lastName, dob, gender, contact, nationality, education, percentage } = req.body;
  console.log('Apply endpoint hit!');
  console.log('Full request body:', req.body);
  console.log('Extracted fields:', { userId, scholarship, firstName, lastName, dob, gender, contact, nationality, education, percentage });
  try {
    const { ObjectId } = require('mongodb');
    const userObjectId = new ObjectId(userId);

    const existing = await Application.findOne({ userId: userObjectId, scholarship });
    if (existing) {
      console.log('Duplicate application detected.');
      return res.status(400).json({ error: 'Already applied for this scholarship.' });
    }
    const application = new Application({ 
      userId: userObjectId, 
      scholarship,
      firstName,
      lastName,
      dob,
      gender,
      contact,
      nationality,
      education,
      percentage
    });
    console.log('Application object to save:', application);
    await application.save();
    console.log('Application saved successfully.');
    res.status(201).json({ message: 'Application saved.' });
  } catch (err) {
    console.error('Apply error:', err);
    res.status(500).json({ error: 'Could not save application.' });
  }
});

// Get applied scholarships for a user
app.get('/api/applied', async (req, res) => {
  const { userId } = req.query;
  try {
    const applications = await Application.find({ userId });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch applications.' });
  }
});

// Cancel (delete) an application for a user
app.delete('/api/applied', async (req, res) => {
  let { userId, scholarship } = req.body;
  try {
    const userObjectId = new ObjectId(userId);
    await Application.findOneAndDelete({ userId: userObjectId, scholarship });
    res.json({ message: 'Application canceled.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not cancel application.' });
  }
});

// Get role by email endpoint
app.get('/api/role', async (req, res) => {
  const { email } = req.query;
  let person = await Admin.findOne({ email });
  if (person) {
    return res.json({ role: person.role });
  }
  person = await User.findOne({ email });
  if (person) {
    return res.json({ role: person.role });
  }
  res.status(404).json({ error: 'User or admin not found' });
});

// Get all users for admin panel (extended)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email createdAt status logins');
    const admins = await Admin.find({}, 'fullName email role createdAt status logins');
    const userList = [
      ...users.map((u, i) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: 'User',
        logins: u.logins || 0,
        status: u.status || 'Active',
        registered: u.createdAt ? u.createdAt.toISOString().slice(0, 10) : 'N/A'
      })),
      ...admins.map((a, i) => ({
        id: a._id,
        name: a.fullName,
        email: a.email,
        role: a.role.charAt(0).toUpperCase() + a.role.slice(1),
        logins: a.logins || 0,
        status: a.status || 'Active',
        registered: a.createdAt ? a.createdAt.toISOString().slice(0, 10) : 'N/A'
      }))
    ];
    res.json(userList);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch users.' });
  }
});

// Update user status (activate/deactivate)
app.post('/api/users/status', async (req, res) => {
  const { id, status, role } = req.body;
  try {
    if (role === 'Admin') {
      await Admin.findByIdAndUpdate(id, { status });
    } else {
      await User.findByIdAndUpdate(id, { status });
    }
    res.json({ message: 'Status updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not update status.' });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { role } = req.query;
  try {
    if (role === 'Admin') {
      await Admin.findByIdAndDelete(id);
    } else {
      await User.findByIdAndDelete(id);
    }
    res.json({ message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete user.' });
  }
});

// Promote/demote user
app.post('/api/users/role', async (req, res) => {
  const { id, newRole } = req.body;
  try {
    await Admin.findByIdAndUpdate(id, { role: newRole });
    res.json({ message: 'Role updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not update role.' });
  }
});

// Test route to verify backend is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Get all applications for admin panel
app.get('/api/admin/applications', async (req, res) => {
  try {
    const applications = await Application.find({})
      .populate('userId', 'name email')
      .sort({ appliedAt: -1 });
    
    console.log('Raw applications from database:', applications);
    
    const applicationList = applications.map(app => {
      const studentName = app.firstName && app.lastName 
        ? `${app.firstName} ${app.lastName}` 
        : app.userId?.name || 'Unknown Student';
      
      return {
        id: app._id,
        scholarship: app.scholarship,
        studentName: studentName,
        studentEmail: app.userId?.email || 'N/A',
        contact: app.contact || 'Not provided',
        nationality: app.nationality || 'Not provided',
        education: app.education || 'Not provided',
        percentage: app.percentage || 'Not provided',
        gender: app.gender || 'Not provided',
        dob: app.dob || 'Not provided',
        appliedAt: app.appliedAt.toISOString().slice(0, 10),
        appliedTime: app.appliedAt.toLocaleTimeString()
      };
    });
    
    console.log('Processed application list:', applicationList);
    res.json(applicationList);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Could not fetch applications.' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
