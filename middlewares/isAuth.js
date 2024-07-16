import jsonwebtoken from "jsonwebtoken";

const isAuth = async (req,res,next) => {

    const jwtSecret = process.env.JWT_SECRET;

    try{
        const authorization = req.headers.authorization ? req.headers.authorization.split(" ") : [];
        const token = authorization.length > 1 ? authorization[1] : null;

        if (token){
            const payload = jsonwebtoken.verify(token,jwtSecret);

            if (payload){
                req.user = {
                    _id : payload._id,
                    name : payload.name,
                    email:payload.email,
                    role:payload.role
                }
                next();
            }else{
                res.code = 400;
                throw new Error("Unauthorized.")
            }
        }else{
            res.code = 400;
            throw new Error("Token is required.")
        }
    }catch (e) {
        next(e);
    }

}

export default isAuth;