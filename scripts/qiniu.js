const qiniu = require('qiniu');
const {
  output, filename, key,
  QINIU_ACCESS_KEY, QINIU_SECRET_KEY, QINIU_BUCKET, QINIU_ZONE,
} = require('../config');

// generate upload token
const mac = new qiniu.auth.digest.Mac(QINIU_ACCESS_KEY, QINIU_SECRET_KEY);
const putPolicy = new qiniu.rs.PutPolicy({
  scope: QINIU_BUCKET,
});
const uploadToken = putPolicy.uploadToken(mac);

// construct uploader
const config = new qiniu.conf.Config();
config.zone = qiniu.zone[QINIU_ZONE];
const uploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

// put file
uploader.putFile(uploadToken, key, `${output}/${filename}`, putExtra, (err, respBody, info) => {
  if (err) throw err;
  if (info.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(info.statusCode);
    console.log(respBody);
  }
});