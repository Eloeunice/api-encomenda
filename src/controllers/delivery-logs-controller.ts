import  type { Request, Response } from "express";
import { prisma } from "../database/prisma.js";
import { z } from "zod";

class DeliveryLogsController {
    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string()
        })
        const {delivery_id, description} = bodySchema.parse(req.body);

        const delivery = await prisma.delivery.findUnique({where: {id: delivery_id}})

        if (!delivery) {
            return res.status(404).json({
                message: "Delivery not found"
            })
        }
        
        if (delivery.status === "delivered") {
            return res.status(400).json({
                message: "Delivery already delivered"
            })
        }
        if (delivery.status === "processing") {
            return res.status(400).json({
                message: "Change status to shipped "
            })
        }

        await prisma.deliveryLog.create({data: {delivery_id, description}})

        return res.status(201).json({message : "Delivery log created"});
    }

    async show(req: Request, res: Response) {
        const paramsSchema = z.object({
            delivery_id: z.string().uuid()
            })

        const {delivery_id} = paramsSchema.parse(req.params);

        const delivery = await prisma.delivery.findUnique({where: {id: delivery_id}, include: {logs: true, user: true}})

        if (req.user.role === "customer" && delivery.userId !== req.user.id) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        return res.status(200).json(delivery)
    }
}

export default DeliveryLogsController