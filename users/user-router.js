const express = require("express")

const restrict = require("../auth/restricted-middleware")
const Users = require("./user-model");

const router = express.Router()

router.get("/", restrict(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

module.exports = router