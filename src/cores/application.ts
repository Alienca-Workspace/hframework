import { serve } from "https://deno.land/std@0.158.0/http/server.ts";
import {Application as ApplicationImpl, Fn} from "./impls/application.ts";
import {Router as RouterImpl} from "./impls/router.ts";
import {Router} from "./router.ts";

export class Application implements ApplicationImpl{
    router: RouterImpl
    constructor() {
        this.router = new Router()
        this.handle = this.handle.bind(this)
    }

    async handle(request: Request): Promise<Response> {
        const url = new URL(request.url);
        const result = this.router.routes[url.pathname]
        if (result === undefined){
            return new Response("Not Found", {
                status: 404,
            })
        }
        if (request.method.toUpperCase() != result["method"]){
            return new Response("Method Not Allowed", {
                status: 500,
            })
        }
        return await result.func(request);
    }

    async run(port: number) {
        await serve(this.handle, { port: port });
    }

    get(path:string,fn:Fn) {
        this.router.routes[path] = {method:"GET",func:fn}
    }

    post(path:string,fn:Fn) {
        this.router.routes[path] = {method:"POST",func:fn}
    }
}