import request from "supertest";
import app from "@/app";
import { createAuthToken } from "./helpers";

const token = createAuthToken("550e8400-e29b-41d4-a716-446655440001");

describe("Deliveries", () => {
  it("POST /deliveries com body inválido (user_id não UUID) retorna 400", async () => {
    const res = await request(app)
      .post("/deliveries")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: "nao-e-uuid",
        description: "Encomenda",
      });
    expect(res.status).toBe(400);
  });

  it("POST /deliveries sem token retorna 401", async () => {
    const res = await request(app).post("/deliveries").send({
      user_id: "550e8400-e29b-41d4-a716-446655440001",
      description: "Encomenda",
    });
    expect(res.status).toBe(401);
  });

  it("GET /deliveries sem token retorna 401", async () => {
    const res = await request(app).get("/deliveries");
    expect(res.status).toBe(401);
  });

  it("POST /deliveries com token retorna 201", async () => {
    const res = await request(app)
      .post("/deliveries")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: "550e8400-e29b-41d4-a716-446655440001",
        description: "Encomenda",
      });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: "Delivery created" });
  });

  it("GET /deliveries com token retorna 200", async () => {
    const res = await request(app)
      .get("/deliveries")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("PATCH /deliveries/:id/status sem token retorna 401", async () => {
    const res = await request(app)
      .patch("/deliveries/550e8400-e29b-41d4-a716-446655440000/status")
      .send({ status: "shipped" });
    expect(res.status).toBe(401);
  });

  it("PATCH /deliveries/:id/status com token retorna 200", async () => {
    const res = await request(app)
      .patch("/deliveries/550e8400-e29b-41d4-a716-446655440000/status")
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "delivered" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Delivery updated" });
  });
});
