module.exports = (req, res) => {
  // TODO: 로그아웃 로직을 작성합니다.
  res.clearCookie('swcjwt')
  res.status(200).send("로그아웃 성공");
};
