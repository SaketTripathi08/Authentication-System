const CLIENT_ORIGIN_DEV = process.env.CLIENT_ORIGIN_DEV;
const CLIENT_ORIGIN_PROD = process.env.CLIENT_ORIGIN_PROD;

const allowedOrigins = [
    CLIENT_ORIGIN_PROD,
    CLIENT_ORIGIN_DEV
];

export default allowedOrigins;