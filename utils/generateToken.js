import jsonwebtoken from "jsonwebtoken";

const generateToken = (user) => {

    const token = jsonwebtoken.sign({_id: user.id, name: user.name, email: user.email, role: user.role}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    return token;
}

export default generateToken;
