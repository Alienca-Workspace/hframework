import { Application } from '../cores/application.ts';
import { signIn } from './api/handler.ts';

const app = new Application();
app.post('/sign-in', await signIn);

await app.run(9091);
