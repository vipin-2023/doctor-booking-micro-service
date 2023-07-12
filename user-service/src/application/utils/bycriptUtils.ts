import bcrypt from 'bcrypt';

export class HashUtility {
  private static readonly saltRounds = 10;

  public static async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, HashUtility.saltRounds);
    return hashedPassword;
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
