import {Client} from "https://deno.land/x/postgres@v0.16.1/mod.ts"

export class PostgresModel{

    static _client: any = null

    constructor() {
    }

    getPoolClient():Client{
        if (PostgresModel._client === null){
            PostgresModel._client = new Client({
                user: "center",
                database: "center",
                hostname: "172.16.33.99",
                port: 5432,
                password: "pass4mingming",
            })
        }
        return PostgresModel._client
    }

}