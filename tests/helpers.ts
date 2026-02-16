import jwt from "jsonwebtoken";

export function createAuthToken(userId: string, role = "customer"): string {
  return jwt.sign(
    { role },
    process.env.JWT_SECRET as string,
    { subject: userId, expiresIn: "1d" }
  );
}
