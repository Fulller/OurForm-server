import dotenv from "dotenv";
import lodash from "lodash";
dotenv.config();

function getEnvValue(name, defaultValue = "") {
  const env = process.env;
  return lodash.get(env, name) || defaultValue;
}
const DEV_CONFIG = {
  app: {
    port: getEnvValue("DEV_APP_PORT", 8000),
    sessionSecret: getEnvValue("DEV_APP_SESSTIONSECRET", "OurFormSECRET"),
    serverUrl: getEnvValue("DEV_APP_SERVERURL", "http://localhost:8000"),
    alwaysLive: getEnvValue("DEV_APP_ALWAYSLIVE", 1),
  },
  db: {
    url: getEnvValue("DEV_DB_URL", "mongodb://localhost:27017/OurForm"),
  },
  auth: {
    google: {
      clientID: getEnvValue(
        "DEV_AUTH_GOOGLE_CLIENTID",
        "609768689359-fcd9ft4sj5v6tndo7vcft164g4f85nvv.apps.googleusercontent.com"
      ),
      clientSecret: getEnvValue(
        "DEV_AUTH_GOOGLE_CLIENTSECRET",
        "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"
      ),
    },
    clientUrl: getEnvValue("DEV_AUTH_CLIENTURL", "http://localhost:3000"),
  },
  jwt: {
    ACCESS_SECRECT_KEY: getEnvValue("DEV_JWT_ACCESS_SECRECT_KEY", "ACCESS"),
    REFRESH_SECRECT_KEY: getEnvValue("DEV_JWT_REFRESH_SECRECT_KEY", "REFRESH"),
    ACCESS_EX: lodash.toNumber(getEnvValue("DEV_JWT_ACCESS_EX", "3600")),
    REFRESH_EX: lodash.toNumber(getEnvValue("DEV_JWT_REFRESH_EX", "7200")),
  },
  cloudinary: {
    cloud_name: getEnvValue("DEV_CLOUDINARY_CLOUD_NAME"),
    api_key: getEnvValue("DEV_CLOUDINARY_API_KEY"),
    api_secret: getEnvValue("DEV_CLOUDINARY_APU_SECRET"),
  },
};
const PRO_CONFIG = {
  app: {
    port: getEnvValue("PRO_APP_PORT", 8000),
    sessionSecret: getEnvValue("PRO_APP_SESSTIONSECRET", "OurFormSECRET"),
    serverUrl: getEnvValue("PRO_APP_SERVERURL", "http://localhost:8000"),
    alwaysLive: getEnvValue("PRO_APP_ALWAYSLIVE", 1),
  },
  db: {
    url: getEnvValue("PRO_DB_URL", "mongodb://localhost:27017/OurForm"),
  },
  auth: {
    google: {
      clientID: getEnvValue(
        "PRO_AUTH_GOOGLE_CLIENTID",
        "609768689359-fcd9ft4sj5v6tndo7vcft164g4f85nvv.apps.googleusercontent.com"
      ),
      clientSecret: getEnvValue(
        "PRO_AUTH_GOOGLE_CLIENTSECRET",
        "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"
      ),
    },
    clientUrl: getEnvValue("PRO_AUTH_CLIENTURL", "http://localhost:3000"),
  },
  jwt: {
    ACCESS_SECRECT_KEY: getEnvValue("PRO_JWT_ACCESS_SECRECT_KEY", "ACCESS"),
    REFRESH_SECRECT_KEY: getEnvValue("PRO_JWT_REFRESH_SECRECT_KEY", "REFRESH"),
    ACCESS_EX: lodash.toNumber(getEnvValue("PRO_JWT_ACCESS_EX", 3600)),
    REFRESH_EX: lodash.toNumber(getEnvValue("PRO_JWT_REFRESH_EX", 7200)),
  },
  cloudinary: {
    cloud_name: getEnvValue("PRO_CLOUDINARY_CLOUD_NAME"),
    api_key: getEnvValue("PRO_CLOUDINARY_API_KEY"),
    api_secret: getEnvValue("PRO_CLOUDINARY_APU_SECRET"),
  },
};
const NODE_ENV = getEnvValue("NODE_ENV", "dev");
export default { dev: DEV_CONFIG, pro: PRO_CONFIG }[NODE_ENV];
