module.exports = {
  port: process.env.PORT,
  mongo_local_connection_string: process.env.MONGO_LOCAL_CONNECTION_STRING,
  jwt_secret: process.env.JWT_SECRET,
  mongo_cloud_connection_string: process.env.MONGO_CLOUD_CONNECTION_STRING,
};
