import { getAuth } from "@clerk/express";
import { CustomJwtSessionClaims } from "@repo/types";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const userAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req);
    const userId = auth?.userId;
    if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    req.userId = auth.userId;
    next();
};

export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req);
    const userId = auth?.userId;
    if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    const claims = auth.sessionClaims as CustomJwtSessionClaims;

    if (claims.metadata?.role !== "admin") {
        return res.status(403).send({ message: "Unauthorized!" });
    }
    req.userId = auth.userId;
    next();
};
