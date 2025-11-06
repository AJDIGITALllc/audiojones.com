declare namespace NodeJS {
  interface ProcessEnv {
    WHOP_API_KEY?: string;
    MAILERLITE_TOKEN?: string;
    MAILERLITE_WEBHOOK_SECRET?: string;
  }
}