declare namespace NodeJS {
  interface ProcessEnv {
    WHOP_API_KEY?: string;
    WHOP_WEBHOOK_SECRET?: string;
    MAILERLITE_TOKEN?: string;
    MAILERLITE_WEBHOOK_SECRET?: string;
    GODADDY_API_KEY?: string;
    GODADDY_API_SECRET?: string;
  }
}