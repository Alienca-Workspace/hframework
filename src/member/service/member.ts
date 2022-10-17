import {PostgresModel} from "../../storage/postgres/postgres.ts";
import {RedisModel} from "../../storage/redis/redis.ts";
import {RabbitmqModel} from "../../storage/rabbitmq/rabbitmq.ts";

const pgModel = new PostgresModel()
const redisModel = new RedisModel()
const rabbitmqModel = new RabbitmqModel()


export const getMemberInfo = async (platform: string,username: string):Promise<object> => {

    const pgClient = await pgModel.getInstance().getPoolClient()
    const redisClient = await redisModel.getInstance().getConnection()
    const rabbitmqClient = rabbitmqModel.getInstance()

    const result = await pgClient.queryObject(
        "select id,password from member.member where username = $1 limit 1",
        ["ming"]
    )

    console.log(result)

    return {
        platform:platform,
        username:username
    }
}