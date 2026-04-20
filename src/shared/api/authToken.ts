let accessToken: string | undefined;

export const setAccessToken = (token: string | undefined) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;
