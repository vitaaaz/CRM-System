let accessToken: string | null = null;

export const tokenStorage = {
  setToken: (token: string) => {
    accessToken = token;
  },
  getToken: () => accessToken,
  clearToken: () => {
    accessToken = null;
  }
};