import { Router as RouterImpl } from './impls/router.ts';

export class Router implements RouterImpl {
	routes: any;
	constructor() {
		this.routes = {};
	}
}
