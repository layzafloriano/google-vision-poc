const vision = require('@google-cloud/vision');

const annotateImage = (imageUri) => {
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  return client
    .annotateImage({
      image: {
        source: {
          imageUri,
        },
      },
      features: [
        {
          type: 'FACE_DETECTION',
        },
        {
          type: 'LABEL_DETECTION',
        },
        {
          type: 'SAFE_SEARCH_DETECTION',
        },
        {
          type: 'WEB_DETECTION',
        },
        {
          type: 'CROP_HINTS',
        },
        {
          type: 'IMAGE_PROPERTIES',
        },
        {
          type: 'DOCUMENT_TEXT_DETECTION',
        },
        {
          type: 'TEXT_DETECTION',
        },
        {
          type: 'LOGO_DETECTION',
        },
        {
          type: 'LANDMARK_DETECTION',
        },
        {
          type: 'TYPE_UNSPECIFIED',
        },
      ],
    });
};

module.exports = {
  annotateImage,
};
