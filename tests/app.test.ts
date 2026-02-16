import request from "supertest";
import app from "@/app";

describe("App", () => {
  it("GET /api-docs retorna 200", async () => {
    const res = await request(app).get("/api-docs/");
    expect(res.status).toBe(200);
  });

  it("rota inexistente retorna 404", async () => {
    const res = await request(app).get("/rota-inexistente");
    expect(res.status).toBe(404);
  });
});
