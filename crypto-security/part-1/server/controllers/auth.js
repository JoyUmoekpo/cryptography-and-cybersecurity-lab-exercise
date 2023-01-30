const bcrypt = require("bcryptjs");

const users = [];

module.exports = {
	login: (req, res) => {
		const { username, password } = req.body;

		for (let i = 0; i < users.length; i++) {
			if (users[i].username === username) {
				const authenticated = bcrypt.compareSync(
					password,
					users[i].passwordHash
				);
				if (authenticated) {
					let userToReturn = { ...users[i] };
					delete userToReturn.passwordHash;
					res.status(200).send(userToReturn);
				}
			}
		}
		res.status(400).send("User not found.");
	},
	register: (req, res) => {
		const { username, email, firstName, lastName, password } = req.body;
		const salt = bcrypt.genSaltSync(5);
		const passwordHash = bcrypt.hashSync(password, salt);

		console.log("Registering User");
		console.log(req.body);
		users.push(req.body);
		res.status(200).send(req.body);
	},
};
