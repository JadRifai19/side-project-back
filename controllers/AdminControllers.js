import Admin from "../models/AdminModels.js";

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get admin by id
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new admin
export const createAdmin = async (req, res) => {
  const admin = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newAdmin = await admin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an admin by id
export const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    admin.username = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    admin.password = req.body.password || admin.password;

    const updatedAdmin = await admin.save();
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an admin by id
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({ message: "Admin deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
