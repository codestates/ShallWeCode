module.exports = {
	signupPost: require('./users').signup,
	signoutDelete: require('./users').signout,
	loginPost: require('./users').login,
	passwordPatch: require('./users').passwordEdit,
	nicknamePatch: require('./users').nicknameEdit,
	picturePatch: require('./users').pictureEdit,
	writingPost: require('./board').writing,
	detailGet: require('./board').detail,
	editPatch: require('./board').edit,
	deleteDelete: require('./board').delete
};