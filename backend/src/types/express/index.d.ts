export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;           // Change from string to number
        username: string;     // Change from email to username
        role: string;
      };
    }
  }
}
