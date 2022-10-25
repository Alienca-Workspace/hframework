import { PostgresModel } from '../../storage/postgres/postgres.ts';
import { RedisModel } from '../../storage/redis/redis.ts';
import { RabbitmqModel } from '../../storage/rabbitmq/rabbitmq.ts';

const pgModel = new PostgresModel(
	'center',
	'pass4mingming',
	'center',
	'159.138.172.203',
	5432,
);
const redisModel = new RedisModel('127.0.0.1', 6379);
// const rabbitmqModel = new RabbitmqModel('127.0.0.1');

export const getMemberInfo = async (
	platform: string,
	username: string,
): Promise<any> => {
	const pgClient = await pgModel.getPoolClient();
	await pgClient.connect();

	const redisConnection = await redisModel.getConnection();
	await redisConnection.set('email', 'f.@gmail.com');

	// await rabbitmqModel.publish('product_channel', {
	// 	name: '照相机1',
	// 	price: 50000.19,
	// });

	try {
		await pgClient.queryObject(
			'select id,password from member.member where username = $1 limit 1',
			['ming'],
		);

		await pgClient.queryObject(
			'insert into member.member(username,password,salt,email) values($1,$2,$3,$4)',
			['liyang', '654321', '000000000', 'liyang@6.com'],
		);

		const result = await pgClient.queryObject(
			'insert into member.member(username,password,salt,email) values($1,$2,$3,$4)',
			['xiaoming', '654321', '000000000', 'liyang@6.com'],
		);

		console.log(result.rows[0]);
	} finally {
		await pgClient.end();
	}

	return {
		platform: platform,
		username: username,
	};
};

export const setMemberInfo = async (
	platform: string,
	username: string,
): Promise<any> => {
	const pgClient = await pgModel.getPoolClient();
	await pgClient.connect();

	try {
		const result = await pgClient.queryObject(
			'insert into member.member(username,password,salt,email) values($1,$2,$3,$4)',
			['liyang', '654321', '000000000', 'liyang@6.com'],
		);
	} finally {
		await pgClient.end();
	}

	return {
		platform: platform,
		username: username,
	};
};
