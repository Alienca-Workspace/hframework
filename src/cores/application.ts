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

        // check the content-type
        if (request.headers.get("content-type") === null){
            return new Response("Content Type Not Found, Please add content-type: application/x-www-form-urlencoded", {
                status: 400,
                headers: {
                    "content-type": "application/json",
                }
            })
        }

        if (result === undefined){
            return new Response("Route Not Found", {
                status: 404,
                headers: {
                    "content-type": "application/json",
                }
            })
        }
        if (request.method.toUpperCase() != result["method"]){
            return new Response("Method Not Allowed", {
                status: 500,
                headers: {
                    "content-type": "application/json",
                }
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