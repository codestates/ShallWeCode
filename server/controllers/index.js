module.exports = {
	signup: require('./users/signup'),
	login: require('./users/login'),
	logout: require('./users/logout'),
	signout: require('./users/signout'),
	nickname: require('./users/edit/nickname'),
	password: require('./users/edit/password'),
	picture: require('./users/edit/picture'),
	boardWriting: require('./board/writing'),
	boardDetail: require('./board/detail'),
	boardEdit: require('./board/edit'),
	boardDelete: require('./board/delete'),
	commentWriting: require('./comment/writing'),
	commentDetail: require('./comment/detail'),
	commentEdit: require('./comment/edit'),
	commentDelete: require('./comment/delete')
};