module.exports = {
	signup: require('./users/signup'),
	login: require('./users/login'),
	logout: require('./users/logout'),
	signout: require('./users/signout'),
	nickname: require('./users/edit/nickname'),
	password: require('./users/edit/password'),
	picture: require('./users/edit/picture'),
	writing: require('./board/writing'),
	detail: require('./board/detail'),
	edit: require('./board/edit'),
	delete: require('./board/delete')
};