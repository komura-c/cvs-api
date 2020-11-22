import basicAuth from 'express-basic-auth';
import * as dotenv from 'dotenv';
dotenv.config();

const myAuthorizer = (username: string, password: string): boolean => {
  const userMatches = basicAuth.safeCompare(
    username,
    `${process.env.ADMIN_NAME ? process.env.ADMIN_NAME : ''}`
  );
  const passwordMatches = basicAuth.safeCompare(
    password,
    `${process.env.ADMIN_PASS ? process.env.ADMIN_PASS : ''}`
  );
  return userMatches && passwordMatches;
};

export const basicAuthentication = basicAuth({
  challenge: true,
  authorizer: myAuthorizer,
  unauthorizedResponse: () => {
    return 'Unauthorized';
  },
});
