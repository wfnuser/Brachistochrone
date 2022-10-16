var axios = require("axios");
var express = require('express');
var router = express.Router();

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get("/login", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/users/oauth-callback&scope=repo,user,gist`
  );
});

router.get("/oauth-callback", async (req, res) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code,
  };
  const opts = { headers: { accept: "application/json" } };

  const response = await axios.post(
    `https://github.com/login/oauth/access_token`,
    body,
    opts
  );
  console.log(response.data);

  const token = await response.data["access_token"];
  const userinfo = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  console.log(userinfo.data);

  res.redirect(`/`);
  // res.send({
  //   status: 200,
  //   data: {
  //     email: emailinfo.data[0].email,
  //     name: userinfo.data.name,
  //     avatar: userinfo.data.avatar_url,
  //   },
  // });
});

module.exports = router;
