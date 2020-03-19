const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/user-model');
const restrict = require ("./restricted-middleware")

router.post("/register", async (req, res, next) => {
	try {
		const { username } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		res.status(201).json(await Users.add(req.body))
	} catch(err) {
		next(err)
	}
})


router.post("/login",  async (req, res, next) => {
	const authError = {
		message: "You shall not pass!",
	}

	try {
		const { username, password } = req.body

		const user = await Users.findBy({ username }).first()
		if (!user) {
			return res.status(401).json(authError)
		}

			const passwordValid = await bcrypt.compare(password, user.password)
		if (!passwordValid) {
			return res.status(401).json(authError)
		}
		
		const payload = {
			userId: user.id, 
		
		}

	
		const token = jwt.sign(payload, process.env.JWT_SECRET)

	
		res.cookie("token", token)

		res.json({
			message: `Welcome ${user.username}!`,
			
		})
	} catch(err) {
		next(err)
	}
})



module.exports = router 