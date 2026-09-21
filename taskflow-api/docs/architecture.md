# TaskFlow Architecture

Requests enter through Fastify routes. Routes validate HTTP data and call a
service. The service owns business rules and depends on the `TaskRepository`
interface. Production uses Prisma; tests use an in-memory repository.

```text
HTTP -> route -> service -> repository -> PostgreSQL
                    |             |
                    |             +-> in-memory test fake
                    +-> application errors
```

`buildApp()` creates the application without opening a port. `server.ts` owns
process concerns such as configuration, database connections, signals, and
graceful shutdown.
