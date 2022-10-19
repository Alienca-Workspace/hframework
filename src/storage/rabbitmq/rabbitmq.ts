import {AmqpConnection, connect} from "https://deno.land/x/amqp@v0.17.0/mod.ts";

export class RabbitmqModel{
    static _connection:any = null
    hostname: string

    constructor(hostname:string) {
        this.hostname = hostname
    }

    async getConnection():Promise<AmqpConnection>{
        if(RabbitmqModel._connection === null){
            RabbitmqModel._connection = await connect({hostname:this.hostname})
        }
        return RabbitmqModel._connection
    }

    async publish(queueName: string,data:any){
        const connection = await this.getConnection()
        const channel = await connection.openChannel()
        await channel.declareQueue({queue: queueName,durable: true})
        await channel.publish(
            {routingKey:queueName},
            {contentType:"application/json",deliveryMode:2},
            new TextEncoder().encode(JSON.stringify(data))
        )
        await connection.close()
    }

    async consume(queueName:string){
        const connection = await this.getConnection()
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