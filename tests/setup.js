process.env.DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5433/test";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";
