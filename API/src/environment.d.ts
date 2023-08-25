export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
    DB_NAME:string;
    PORT: number;
    DB_USER: string;
    DB_USERS_COLLECTION_NAME:string;
    DB_TESTS_COLLECTION_NAME:string;
    DB_USERS_PASSWORD:string;
    CONNECTION_STRING:string;
    ACCESS_TOKEN_SECRET:jwt.Secret;
    REFRESH_TOKEN_SECRET:jwt.Secret;
    }
  }
}
