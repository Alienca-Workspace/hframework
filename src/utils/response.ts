import { crypto } from 'https://deno.land/std@0.160.0/crypto/mod.ts';

export const error = async (
	message: string,
	code: number = 0,
): Promise<Response> => {
	return new Response(
		JSON.stringify({
			message: message,
			code: code,
		}),
		{
			status: 500,
			headers: {
				'content-type': 'application/json',
			},
		},
	);
};

export const success = async <DataType>(
	message: string,
	data: DataType,
	code: number = 1,
): Promise<Response> => {
	return new Response(
		JSON.stringify({
			message: message,
			data: data,
			code: code,
		}),
		{
			status: 200,
			headers: {
				'content-type': 'application/json',
				'uuid': crypto.randomUUID(),
			},
		},
	);
};
