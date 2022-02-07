const recaptcha_async = require("recaptcha-async");
const recaptcha = new recaptcha_async.reCaptcha();

recaptcha.on("data", function (res) {
  if (res.is_valid) html = "valid answer";
  else html = recaptcha.getCaptchaHtml(mypublickey, res.error);
});

recaptcha.checkAnswer(
  myprivatekey,
  req.connection.remoteAddress,
  req.body.recaptcha_challenge_field,
  req.body.recaptcha_response_field
);

module.exports = {
  recaptcha,
};
