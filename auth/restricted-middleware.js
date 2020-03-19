// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers
//   const secret = "keep it secret, keep it safe"

//   if (authorization){
//     jwt.verify(authorization, secret, (err, decodedToken) => {
//       if(err) {
//         res.status(401).json({ message: "Invalid Credentials" })
//       } else {
//         req.decodedToken = decodedToken
//         next();
//       }
//     })
//   } else {
//     res.status(400).json({message: "No credentials provided"})
//   }
// } 

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Users = require("../users/user-model")

function restrict() {
	const authError = {
		message: "You shall not pass!",
	}
	
	return async (req, res, next) => {
		try {

			const { token } = req.cookies
			if (!token){
				return res.status(401).json(authError)
			} 
			// verifying the token's signature
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
				if(err){
					return res.status(401).json(authError)
				}

				req.token = decoded
				console.log(decoded)

				
			})
			
			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict