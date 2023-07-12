import jwt from 'jsonwebtoken';

export class TokenUtility {
  private static readonly secretKey = 'top-secret-001';

  public static signToken(payload: any): string {
    return jwt.sign(payload,process.env.JWT_SECRET || TokenUtility.secretKey, '1h');
  }

  public static verifyToken(token: string): any {
    try {
      return jwt.verify(token, TokenUtility.secretKey);
    } catch (error) {
      return null;
    }
  }
}
