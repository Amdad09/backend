import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { db, mongoClient } from './db.js';
import { env } from './env.js';
import { DEFAULT_ROLE } from './roles.js';

export const auth = betterAuth({
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    database: mongodbAdapter(db, { client: mongoClient }),
    trustedOrigins: [env.CLIENT_URL],
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: false,
                defaultValue: DEFAULT_ROLE,
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => ({
                    data: {
                        ...user,
                        role: DEFAULT_ROLE,
                    },
                }),
            },
        },
    },
});
