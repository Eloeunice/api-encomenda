import request from "supertest";
import app from "@/app";

describe("POST /users", () => {
  it("cria usuário com dados válidos", async () => {
    const res = await request(app).post("/users").send({
      name: "João Silva",
      email: "joao@email.com",
      password: "123456",
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: "User created" });
  });

  it("retorna 400 com nome curto", async () => {
    const res = await request(app).post("/users").send({
      name: "Jo",
      email: "joao@email.com",
      password: "123456",
    });
    expect(res.status).toBe(400);
  });

  it("retorna 400 com email inválido", async () => {
    const res = await request(app).post("/users").send({
      name: "João",
      email: "invalido",
      password: "123456",
    });
    expect(res.status).toBe(400);
  });

  it("retorna 400 com senha curta", async () => {
    const res = await request(app).post("/users").send({
      name: "João",
      email: "joao@email.com",
      password: "12345",
    });
    expect(res.status).toBe(400);
  });
});
