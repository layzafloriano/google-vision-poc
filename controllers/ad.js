const visionApi = require('../helpers/visionApi');

const newAd = (req, res) => {
  res.render('new-ad');
};

const errorAd = (err) => {
  // TODO: Modal Erro
  console.log('err', err);
};

const successAd = (visionResult, resExpress) => {
  // res.render('success-ad');

  const viewObject = {
    labels: visionResult[0].labelAnnotations,
    result: JSON.stringify(visionResult[0]),
  };
  resExpress.render('vision-labels', viewObject);
};

const recuseAd = (res, reason) => {
  res.render('recuse-ad', { reason });
};

const publishAd = (adData, visionResult, resExpress) => {
  // Save ad in DB
  console.log('adData', adData);
  return successAd(visionResult, resExpress);
};

const verifyContentAd = (adData, visionResult, resExpress) => {
  if (!visionResult) {
    return errorAd('Tente mais tarde');
  }

  // console.log(JSON.stringify(visionResult));

  if (visionResult[0].faceAnnotations.length) {
    const reason = 'Pessoa na foto';
    return recuseAd(resExpress, reason);
  }

  return publishAd(adData, visionResult, resExpress);
};

const processVisionApi = (adData, resExpress) => {
  visionApi.annotateImage(adData.imageUrl)
    .then((result) => {
      verifyContentAd(adData, result, resExpress);
    })
    .catch(errorAd);
};

const processNewAd = (req, res) => {
  const { title, description } = req.body;
  const adData = {
    title,
    description,
    imageUrl: req.file.url,
  };

  return processVisionApi(adData, res);
};

module.exports = {
  newAd,
  processNewAd,
  successAd,
  recuseAd,
};
