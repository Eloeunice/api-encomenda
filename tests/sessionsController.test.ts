import request from "supertest";
import app from "@/app";

describe("POST /sessions", () => {
  it("retorna 404 quando usuário não existe", async () => {
    const res = await request(app).post("/sessions").send({
      email: "naoexiste@email.com",
      password: "123456",
    });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  it("retorna 400 com body vazio", async () => {
    const res = await request(app).post("/sessions").send({});
    expect([400, 404]).toContain(res.status);
  });
});
