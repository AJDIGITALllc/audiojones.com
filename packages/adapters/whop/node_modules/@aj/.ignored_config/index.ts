import { EnvSchema, validateEnv } from "./env.schema";

// Validate environment at module load time
const env = validateEnv(process.env);

export { env, EnvSchema, validateEnv };
export type { Env } from "./env.schema";