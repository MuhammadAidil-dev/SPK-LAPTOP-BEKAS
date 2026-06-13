const getEnv = (key: string) => {
  const value = process.env[key];
  if (value === undefined || value === '') {
    throw new Error(
      `Environment variable ${key} is required to run the server`,
    );
  }

  return value.trim();
};

export const loadEnvPublic = () => {
  return {
    NODE_ENV: getEnv('NEXT_PUBLIC_NODE_ENV'),
    BASE_URL: getEnv('NEXT_PUBLIC_BASE_URL'),
  };
};
