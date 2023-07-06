import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-jwt-secret'; 

const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json('Authentication failed');
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json('Invalid token');
    }
    req.user = user;
    next();
  });
};

export { authenticateToken };
