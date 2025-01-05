import { t } from "elysia";
import { createResponseSchema } from "./response";

export const User = t.Object({
    id: t.String(),
    name: t.String(),
    email: t.String(),
    username: t.String(),
});

export const GetUsersResponse = createResponseSchema(t.Array(User));