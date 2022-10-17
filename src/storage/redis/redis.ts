import { connect,Redis } from "https://deno.land/x/redis@v0.27.1/mod.ts";

export class RedisModel{
    static _instance:any = null

    constructor() {}

    getInstance():RedisModel{
        if(RedisModel._instance === null){
            RedisModel._instance = new RedisModel()
        }
        return <RedisModel>RedisModel._instance
    }

    async getConnection():Promise<Redis>{
        return await connect({
            hostname: "172.16.33.99",
            port: 6379
        })
    }

}