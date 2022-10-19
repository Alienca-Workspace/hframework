import {Client} from "https://deno.land/x/postgres@v0.16.1/mod.ts"

export class PostgresModel{

    static _client: any = null
    user: string
    password: string
    database: string
    hostname: string
    port: number

    constructor(user: string,password: string,database: string,hostname: string,port: number) {
        this.user = user
        this.password = password
        this.database = database
        this.hostname = hostname
        this.port = port
    }

    getPoolClient():Client{
        if (PostgresModel._client === null){
            PostgresModel._client = new Client({
                user: this.user,
                database: this.database,
                hostname: this.hostname,
                port: this.port,
                password: this.password,
            })
        }
        return PostgresModel._client
    }

}