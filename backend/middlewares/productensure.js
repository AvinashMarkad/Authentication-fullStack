
const jwt = require('jsonwebtoken');

const productensure = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        // const token = auth.split(' ')[1]; // Extract the token from "Bearer <token>"
        // if (!token) {
        //     return res.status(401).json({ message: "Unauthorized: Token is missing" });
        // }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = {
   productensure,
};



//............................

// const jwt = require('jsonwebtoken');

// const productensure = (req, res, next) => {
//     const auth = request.headers["authorization"];
//     if (!auth) {
//         return res.status(401).json({ message: "Unauthorized jeson web token" });
//     }
//     try {
//         const decoded = jwt.verify(auth, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     }catch (error) {
//         // console.error(error);
//         return res.status(401).json({ message: "Unauthorized jeson web token" });
//     }
// };



// module.exports = {
//    productensure,
    
// };

