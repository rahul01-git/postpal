"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const auth_middleware_1 = require("../middleware/auth.middleware");
async function Context({ req }) {
    try {
        if (req.headers.authorization) {
            const tokenData = await (0, auth_middleware_1.authenticate)(req.headers.authorization);
            return { user: tokenData === null || tokenData === void 0 ? void 0 : tokenData.user, token: req.headers.authorization };
        }
        throw new Error("Authorization Header is Missing");
    }
    catch (error) {
        console.log(`Error in context: ${error}`);
        throw error;
    }
}
exports.Context = Context;
