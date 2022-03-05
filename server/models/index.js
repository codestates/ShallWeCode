module.exports = {
	signupPost: require('./users').signup,
	signoutDelete: require('./users').signout,
	loginPost: require('./users').login,
	writingPost: require('./board').writing,
	detailGet: require('./board').detail
};