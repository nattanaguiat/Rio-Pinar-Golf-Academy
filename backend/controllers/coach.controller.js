import Coach from "../models/coach.model.js";

export const coachesList = async (req, res) => {
  try {
    const coaches = await Coach.find({}).select(["-password", "-email"]);

    res.json({ success: true, coaches });
  } catch {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
