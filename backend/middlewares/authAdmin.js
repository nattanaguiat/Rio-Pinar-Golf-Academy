import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({ succes: false, message: "Not Authorized" });
    }
    const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    if (
        token_decoded.email !== process.env.ADMIN_EMAIL ||
        token_decoded.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    next()
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
