import { Router } from './router.ts';

export type Fn = (request: Request) => Promise<Response>;
type Run = (port: number) => void;
type Get = (path: string, fn: Fn) => void;
type Post = (path: string, fn: Fn) => void;

export interface Application {
	router: Router;
	get: Get;
	post: Post;
	run: Run;
}
