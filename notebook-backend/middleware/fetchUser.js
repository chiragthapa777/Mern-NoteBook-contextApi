const jwt=require("jsonwebtoken");

const JWT_SECRET_KEY = "thisIsARandomString";

const fetchUser=(req, res, next)=>{
    //get the user from the jwt token and append and id to req object
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data=jwt.verify(token, JWT_SECRET_KEY)
        req.user=data.user;
        next()
    } catch (error) {
        return res.status(401).send({error:"Please authenticate using a valid token"})
        
    }
}

module.exports=fetchUser