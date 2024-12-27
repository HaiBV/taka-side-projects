const PREFIX = "VITE_";

export const ENV_VAR_KEYS = ["APP_TITLE", "JOKE_API_BASE_URL", "JOKE_API_KEY", "JOKE_API_HOST"] as const;

const env = (key: (typeof ENV_VAR_KEYS)[keyof typeof ENV_VAR_KEYS]): string => {
  return import.meta.env[`${PREFIX}${key}`];
};

export default env;
