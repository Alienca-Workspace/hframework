import { crypto } from 'https://deno.land/std@0.160.0/crypto/mod.ts';
import {
	decode,
	encode,
} from 'https://deno.land/std@0.160.0/encoding/base64.ts';

export const encodeMd5 = async (raw: string | number): Promise<string> => {
	if (typeof raw === 'number') {
		raw = raw.toString();
	}
	const buf = new Uint8Array(
		await crypto.subtle.digest(
			'MD5',
			new TextEncoder().encode(raw),
		),
	);
	return Array.from(buf).map((b) => b.toString(16).padStart(2, '0')).join('');
};

export const getKey = async (
	resourceId: number | string,
	method: string,
	module: string,
): Promise<string> => {
	const rawKey = typeof resourceId === 'string'
		? resourceId + method + module
		: resourceId.toString() + method + module;
	return await encodeMd5(rawKey);
};

export const generateToken = async (
	id: string | number,
	expired: number,
	str: string,
): Promise<string> => {
	const payload = {
		id: id,
		expired: expired,
	};
	const payloadJsonStr = JSON.stringify(payload);
	return encode(payloadJsonStr) + '.' +
		(await encodeMd5(payloadJsonStr + str));
};

type TokenValue = { id: string | number; expired: bigint } | null;
export const parseToken = async (
	token: string,
	str: string,
): Promise<TokenValue> => {
	try {
		const arr = token.split('.');
		const textDecoder = new TextDecoder('utf-8');
		const decodeValue = textDecoder.decode(decode(arr[0]));
		if (await encodeMd5(decodeValue + str) != arr[1]) {
			return null;
		}
		const decodeJson = <TokenValue> JSON.parse(decodeValue);
		const currentTime: number = Math.floor(Date.now() / 1000);
		if (decodeJson != null) {
			if (decodeJson.expired < currentTime) {
				return null;
			}
		}
		return decodeJson;
	} catch (e) {
		return null;
	}
};

const strArr: string[] = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'!',
	'~',
	'&',
	'*',
	'$',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'P',
	'R',
	'S',
];

export const getRandomString = async (num: number): Promise<string | null> => {
	if (num < 1) {
		return null;
	}

	let str = '';
	for (let i = 0; i < num; i++) {
		str += strArr[Math.floor(Math.random() * strArr.length)];
	}
	return str;
};
