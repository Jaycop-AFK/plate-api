import mongoose from "mongoose";

// สร้าง Schema สำหรับบันทึกการเข้ามาของรถ
const carEntrySchema = new mongoose.Schema({
    license_plate: { type: String, required: true },
    name: { type: String, required: true },
    entry_time: { type: Date, default: Date.now }
  });
  
  const CarEntryModel = mongoose.model("CarEntry", carEntrySchema);

  export default CarEntryModel;



  