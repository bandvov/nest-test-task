export const validateToken = (token: string) => {
  return token === process.env.TOKEN;
};
