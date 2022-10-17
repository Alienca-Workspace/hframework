import {Pool, PoolClient} from "https://deno.land/x/postgres@v0.16.1/mod.ts"

export class PostgresModel{
    static _instance:any = null
    POOL_CONNECTIONS = 20

    constructor() {}

    getInstance():PostgresModel{
        if(PostgresModel._instance === null){
            PostgresModel._instance = new PostgresModel()
        }
        return <PostgresModel>PostgresModel._instance
    }

    async getPoolClient():Promise<PoolClient>{
        const pool = new Pool({
            user: "center",
            database: "center",
            hostname: "172.16.33.99",
            port: 5432,
            password: "pass4mingming",
        },this.POOL_CONNECTIONS)
        return await pool.connect()
    }

}