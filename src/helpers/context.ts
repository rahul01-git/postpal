import { UserInterface } from "../interfaces"
import { authenticate } from "../middleware/auth.middleware"

export interface MyContext {
    user?: UserInterface | null
    token?: string | undefined
}

export async function Context({ req }: { req: any }) {
    try {
        if (req.headers.authorization) {
            const tokenData = await authenticate(req.headers.authorization);
            return { user: tokenData?.user, token: req.headers.authorization };
        }

        throw new Error("Authorization Header is Missing");


    } catch (error) {
        console.log(`Error in context: ${error}`);
        throw error;
    }

}

