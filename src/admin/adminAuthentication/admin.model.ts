import mongoose from "mongoose";
import Iadmin from "./admin.interface";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: Boolean,
});

const AdminModel = mongoose.model<Iadmin & mongoose.Document>(
  "Admin",
  adminSchema
);

export default AdminModel;
