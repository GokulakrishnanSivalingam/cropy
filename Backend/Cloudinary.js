// backend/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dnb5k6kpt',
  api_key: '212565285725126',
  api_secret: '-cY7iqkEx4ClMNqbvs3PXj0FfQc',
});

module.exports = cloudinary;