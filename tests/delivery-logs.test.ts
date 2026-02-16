import request from "supertest";
import app from "@/app";
import { createAuthToken } from "./helpers";

const token = createAuthToken("550e8400-e29b-41d4-a716-446655440001");
const deliveryId = "550e8400-e29b-41d4-a716-446655440000";

describe("Delivery Logs", () => {
  it("POST /delivery-logs sem token retorna 401", async () => {
    const res = await request(app).post("/delivery-logs").send({
      delivery_id: deliveryId,
      description: "Saiu para entrega",
    });
    expect(res.status).toBe(401);
  });

  it("POST /delivery-logs com token retorna 201", async () => {
    const res = await request(app)
      .post("/delivery-logs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        delivery_id: deliveryId,
        description: "Saiu para entrega",
      });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: "Delivery log created" });
  });

  it("GET /delivery-logs/:delivery_id/show sem token retorna 401", async () => {
    const res = await request(app).get(
      `/delivery-logs/${deliveryId}/show`
    );
    expect(res.status).toBe(401);
  });

  it("POST /delivery-logs com delivery_id inválido retorna 400", async () => {
    const res = await request(app)
      .post("/delivery-logs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        delivery_id: "invalido",
        description: "Log",
      });
    expect(res.status).toBe(400);
  });

  it("GET /delivery-logs/:delivery_id/show com token retorna 200", async () => {
    const res = await request(app)
      .get(`/delivery-logs/${deliveryId}/show`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", deliveryId);
    expect(res.body).toHaveProperty("deliveryLog");
    expect(res.body).toHaveProperty("user");
  });
});
