module.exports = (req, res, next) => {
		// this is to check if there is a user logging in
		if(!req.user) {
			return res.status(401).send({ error: 'You must login' })
		}
		next();
}