import dotenv from "dotenv";

dotenv.config();

const config = {
    region: process.env.REGION || 'eu', // Updated to use process.env.REGION
    refresh_token: process.env.REFRESH_TOKEN,
    access_token: process.env.ACCESS_TOKEN,
    credentials: {
        SELLING_PARTNER_APP_CLIENT_ID: process.env.SELLING_PARTNER_APP_CLIENT_ID,
        SELLING_PARTNER_APP_CLIENT_SECRET: process.env.SELLING_PARTNER_APP_CLIENT_SECRET
    },
    options: {
        auto_request_tokens: true,
        auto_request_throttled: true,
        version_fallback: true,
        use_sandbox: false,
        only_grantless_operations: false,
        user_agent: 'amazon-sp-api/<CLIENT_VERSION> (Language=Node.js/<NODE_VERSION>; Platform=<OS_PLATFORM>/<OS_RELEASE>)',
        debug_log: true,
        retry_remote_timeout: true,
    }
};

export default config;
