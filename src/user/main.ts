import {Application} from "../cores/application.ts";
import {getUserInfo} from "./api/handler.ts";
const app = new Application()

app.get("/user-info",await getUserInfo)
app.post("/user-info",await getUserInfo)

await app.run(8081)