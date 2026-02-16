export const PrismaClient = jest.fn().mockImplementation(() => ({
  user: {
    findUnique: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({}),
  },
  delivery: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({
      id: "550e8400-e29b-41d4-a716-446655440000",
      userId: "550e8400-e29b-41d4-a716-446655440001",
      status: "shipped",
      deliveryLog: [],
      user: { name: "Test" },
    }),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
  },
  deliveryLog: {
    create: jest.fn().mockResolvedValue({}),
  },
}));
