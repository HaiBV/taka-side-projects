const PREFIX = "VITE_";

type ENV_VAR_KEYS = "APP_TITLE" | "JOKE_API_BASE_URL" | "JOKE_API_KEY" | "JOKE_API_HOST";

const env = (key: ENV_VAR_KEYS): string => {
  return import.meta.env[`${PREFIX}${key}`];
};

export default env;
