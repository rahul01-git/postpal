import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const getJwtToken = (id: number, email: string) => {
  const jwtSecret = process.env.JWT_SECRET! 
  const expiresIn = '1d';
  
  const payload = {
    id,
    email
  };
  
  const signedToken = jwt.sign(payload, jwtSecret, { expiresIn });
  
  return {
    token: "Bearer " + signedToken,
    expiresIn
  };
};
