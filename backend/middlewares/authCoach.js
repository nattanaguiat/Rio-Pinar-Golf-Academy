import jwt from "jsonwebtoken";

const authCoach = async (req, res, next) => {
  try {
    const { ctoken } = req.headers;
    if (!ctoken) {
      return res.json({ success: false, message: "Not Authorized" });
    }
    const token_decoded = jwt.verify(ctoken, process.env.JWT_SECRET);

    if (!req.body) {
      req.body = {};
    }

    req.body.coachId = token_decoded.id

    next()
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authCoach;