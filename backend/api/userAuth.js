import jwt from 'jsonwebtoken'

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"];
        console.log('inside Authorization token',authHeader)
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token,'inside authentication token')
    if(token === null){
       return res.status(401).json({message:"Authorization token in required."})
    }

    jwt.verify(token,"fitnessstore", (err,user) => {
        if(err){
           return res.status(401).json({message:"Token expired please login againn."})
        }
        req.user = user;
        next()
    })
}

export default authenticateToken;
