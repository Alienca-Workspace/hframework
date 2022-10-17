import { connect } from "https://deno.land/x/amqp@v0.17.0/mod.ts";

export class RabbitmqModel{
    static _instance:any = null

    constructor() {}

    getInstance():RabbitmqModel{
        if(RabbitmqModel._instance === null){
            RabbitmqModel._instance = new RabbitmqModel()
        }
        return <RabbitmqModel>RabbitmqModel._instance
    }

    async publish(queueName: string,data:any){
        const connection = await connect({hostname:"172.16.33.99"})
        const channel = await connection.openChannel()
        await channel.declareQueue({queue: queueName})
        await channel.publish(
            {routingKey:queueName},
            {contentType:"application/json"},
            new TextEncoder().encode(JSON.stringify(data))
        )
        await connection.close()
    }

    async consume(queueName:string){
        const connection = await connect({hostname:"172.16.33.99"})
        const channel = await connection.openChannel()
        await channel.declareQueue({queue: queueName})
        await channel.consume(
            {queue: queueName},
            async (args, props,data) => {
                console.log(JSON.stringify(args));
                console.log(JSON.stringify(props));
                console.log(new TextDecoder().decode(data));
                await channel.ack({ deliveryTag: args.deliveryTag })
            }
        )
    }
}