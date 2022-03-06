const router = require("express").Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser=require("../middleware/fetchUser")

const JWT_SECRET_KEY = "thisIsARandomString";
//ROUTE_1:create a user using post "api/auth/", Doesn't require auth
router.post(
  "/register",
  //using a validator middleware to validate the request's body
  [
    body("name", "Enter a name length greater than 3").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a a strong password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors});
      }
      //check if same email exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with same email exists" });
      }
      //hashing password;
      const salt = await bcrypt.genSalt(10);
      const hassedPass = await bcrypt.hash(req.body.password, salt);
      //else creating the user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hassedPass,
      });

      //jwt access token
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };
      const authtoken = jwt.sign(payload, JWT_SECRET_KEY);

      res.status(200).json({authtoken});
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
);

// ROUTE_2:login user no authentication is required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a a strong password").exists(),
  ],
  async (req, res) => {
    try {
      let sucess=false
      //validate inputfrom user/request's body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      //find a user with given email
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Given email or password is not correct" });
      }
      //compare the password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Given email or password is not correct" });
      }

      //jwt access token
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };
      const authtoken = jwt.sign(payload, JWT_SECRET_KEY);

      res.status(200).json({authtoken});
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
}
);

//ROUTE_3:get user logged in detail, jwt auth needed/login required
router.post('/getuserdetail',fetchUser,async (req,res)=>{
    try {
        const userId=req.user.id;
        const user= await User.findById(userId).select("-password")
        res.status(200).send(user)
        
        
    } catch (error) { 
        res.status(500).json(error);
        console.log(error);
    }
})

module.exports = router;
