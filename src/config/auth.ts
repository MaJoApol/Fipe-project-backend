import dotenv from "dotenv";

dotenv.config();


export default {
    secret_token: process.env.SECRET_TOKEN || "",
    secret_refresh_token: process.env.SECRET_REFRESH_TOKEN || "",
    expires_in_token: "15",
    expires_in_token_minutes: 15,
    expires_in_refresh_token: "7200m",
    expires_refresh_token_minutes: 7200
};

