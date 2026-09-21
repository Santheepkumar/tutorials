import { buildApp } from "../src/app.js";

const app = await buildApp({ logger: false });
await app.listen({ port: 3000, host: "127.0.0.1" });
console.log("TaskFlow preview: http://127.0.0.1:3000/docs");
