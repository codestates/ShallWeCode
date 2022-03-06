module.exports = {
    signupPost: require('./users').signup,
    signoutDelete: require('./users').signout,
    userinfoPatch: require('./users').userinfo,
    loginPost: require('./users').login
};