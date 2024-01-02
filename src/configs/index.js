import dotenv from "dotenv";
import lodash from "lodash";
dotenv.config();

const NODE_ENV = lodash.get(process.env, "NODE_ENV", "DEV");
function getEnvValue(name, defaultValue = "") {
  const env = process.env;
  return lodash.get(env, NODE_ENV + "_" + name) || defaultValue;
}
const CONFIG = {
  app: {
    port: getEnvValue("APP_PORT", 8000),
    sessionSecret: getEnvValue("APP_SESSTIONSECRET", "OurFormSECRET"),
    serverUrl: getEnvValue("APP_SERVERURL", "http://localhost:8000"),
    alwaysLive: getEnvValue("APP_ALWAYSLIVE", 1),
  },
  db: {
    url: getEnvValue("DB_URL", "mongodb://localhost:27017/OurForm"),
  },
  auth: {
    google: {
      clientID: getEnvValue(
        "AUTH_GOOGLE_CLIENTID",
        "609768689359-fcd9ft4sj5v6tndo7vcft164g4f85nvv.apps.googleusercontent.com"
      ),
      clientSecret: getEnvValue(
        "AUTH_GOOGLE_CLIENTSECRET",
        "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"
      ),
    },
    clientUrl: getEnvValue("AUTH_CLIENTURL", "http://localhost:3000"),
  },
  jwt: {
    ACCESS_SECRECT_KEY: getEnvValue("JWT_ACCESS_SECRECT_KEY", "ACCESS"),
    REFRESH_SECRECT_KEY: getEnvValue("JWT_REFRESH_SECRECT_KEY", "REFRESH"),
    ACCESS_EX: lodash.toNumber(getEnvValue("JWT_ACCESS_EX", "3600")),
    REFRESH_EX: lodash.toNumber(getEnvValue("JWT_REFRESH_EX", "7200")),
  },
  cloudinary: {
    cloud_name: getEnvValue("CLOUDINARY_CLOUD_NAME"),
    api_key: getEnvValue("CLOUDINARY_API_KEY"),
    api_secret: getEnvValue("CLOUDINARY_API_SECRET"),
    folder: getEnvValue("CLOUDINARY_FOLDER", "our_form"),
  },
};
export default CONFIG;
