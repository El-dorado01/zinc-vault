// import jwt from "jsonwebtoken";

// export function generateSessionToken(email: string): string {
//   return jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "3h" }); // 3-hour expiration
// }

// export function verifySessionToken(token: string): { email: string } | null {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
//   } catch (err: any) {
//     console.error("Invalid or expired session token:", {
//       message: err.message,
//       stack: err.stack,
//     });
//     return null;
//   }
// }
