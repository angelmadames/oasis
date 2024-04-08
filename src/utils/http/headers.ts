export const httpHeaders = {
  basicAuth(user: string, password: string) {
    return `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`;
  },
  bearerAuth(token: string) {
    return `Bearer ${token}`;
  },
};

export default httpHeaders;
