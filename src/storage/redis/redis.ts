import { connect,Redis } from "https://deno.land/x/redis@v0.27.1/mod.ts";

export class RedisModel{
    static _connection:any = null
    hostname: string
    port: number

    constructor(hostname: string,port: number) {
        this.hostname = hostname
        this.port = port
    }

    async getConnection():Promise<Redis>{
        if(RedisModel._connection === null){
            RedisModel._connection = await connect({
                hostname: this.hostname,
                port: this.port
            })
        }
        return RedisModel._connection
    }

}