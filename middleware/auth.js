const {getUser}=require("../services/auth");

const restrictToLoginUserOnly=async(req,res,next)=>{
  const userId=req.cookies.uid;
  if(!userId) return res.status(401).json({error:"User is not authorized"});
  const user=await getUser(userId);
  if(!user) return res.status(401).json({ error: "User is not authorized" });
  req.user=user;
  next();
}
module.exports={restrictToLoginUserOnly}