This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

The project is about employee data submit in a wizard form. You can visit [`https://haidar-test-amartha.vercel.app/wizard?role=admin](https://haidar-test-amartha.vercel.app/wizard?role=admin) to see the results via Vercel.

## Getting Started

First, clone this repository by command via SSH in terminal:

```bash
git clone git@github.com:haidardzaky/employee-submit.git
```

Then, install dependency library by running command in terminal:

```bash
npm install
```

## Mock mode

Then create file .env.mock for mock mode to feel the json server and copy all values below:

```bash
NEXT_PUBLIC_API_SERVICE=http://localhost:3801

NEXT_PUBLIC_API_SERVICE_BASIC_INFO=http://localhost:4001

NEXT_PUBLIC_API_SERVICE_DETAILS=http://localhost:4002

NEXT_PUBLIC_API_ENVIRONMENT=MOCK
```

After that run in terminal :

```bash
npm run mock:servers
```

Then run in terminal in another tab :

```bash
npm run mock
```

Open [http://localhost:3800/wizard?role=admin](http://localhost:3800/wizard?role=admin) with your browser to see the result.

## Dev mode

Dev mode using direct api from nextJS api to simulate fetch data like getting data from BackEnd.

Then create file .env.dev for dev mode to feel the json server and copy all values below:

```bash
NEXT_PUBLIC_API_SERVICE=http://localhost:3800/api

NEXT_PUBLIC_API_SERVICE_BASIC_INFO=http://localhost:3800/api/v1

NEXT_PUBLIC_API_SERVICE_DETAILS=http://localhost:3800/api/v2

NEXT_PUBLIC_API_ENVIRONMENT=DEV
```

After that run in terminal :

```bash
npm run dev
```

Open [http://localhost:3800/wizard?role=admin](http://localhost:3800/wizard?role=admin) with your browser to see the result.

# Test

To run unit test copy the terminal command below :

```bash
npm run test --all
```

and see the testing running on terminal :).

## Author

lets connect on GitHub !
[https://github.com/haidardzaky](https://github.com/haidardzaky)

Muhammad Haidar Dzaky, FrontEnd Engineer
