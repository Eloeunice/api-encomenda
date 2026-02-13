import type { Request, Response } from "express";
import { prisma } from "../database/prisma.js";
import { z } from "zod";

class DeliveriesController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string(),
    });
    const { user_id, description } = bodySchema.parse(req.body);

    await prisma.delivery.create({ data: { user_id, description } });

    return res.status(201).json({ message: "Delivery created" });
  }

  async getAll(req: Request, res: Response) {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: { select: { name: true } },
      },
    });
    return res.status(200).json(deliveries);
  }

  async update(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const bodySchema = z.object({
      status: z.enum(["processing", "shipped", "delivered"]),
    });

    const { id } = paramsSchema.parse(req.params);
    const { status } = bodySchema.parse(req.body);

    await prisma.delivery.update({
      where: { id },
      data: { status },
    });

    await prisma.deliveryLog.create({
      data: {
        delivery_id: id,
        description: `Delivery status updated to ${status}`,
      },
    });

    return res.status(200).json({ message: "Delivery updated" });
  }
}

export default DeliveriesController;
