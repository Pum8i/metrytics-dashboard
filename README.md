# Metrytics Dashboard

A simple analytics dashboard and server, built with Next.js to receive and display Website Analytics.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Database ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Customized shadcn/ui components](https://ui.shadcn.com/)
- **Hosting/Database:** Has been built with hosting on [Vercel](https://vercel.com) and using the [Neon Serverless Postgres](https://vercel.com/marketplace/neon) database
- **Auth:** [NextAuth.js](https://next-auth.js.org/)

## Features

- Modern dashboard interface
- API service to receive telemetry data
- Database integration with Drizzle ORM
- Responsive design

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Set up your environment variables:

```bash
cp .example.env .env
```

4. Set up database using drizzle

```bash
pnpm db:generate
pnpm db:push
```

n.b. if you get the `error: function uuid_generate_v4() does not exist`, you might need to run

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

in your database to enable `uuid-ossp` extension

5. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

6. Seed the database (optional)

Uncomment return statement in `app/api/seed/route.ts` and then goto [http://localhost:3000/api/seed](http://localhost:3000/api/seed)

7. Use Mock Data (optional)

Uncomment `generateMockVisitors(10)` in `app/api/analytics/visitors`

8. Telemetry can be added to the database by making a POST call to http://localhost:3000/api/analytics

n.b. Data can be sent by making a simple POST call from your app you want to track, to your server. There is also the [Metrytics Web Client](https://www.npmjs.com/package/metrytics-client) package that can be used to make things _slightly_ easier

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
