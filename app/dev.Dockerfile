FROM node:18-alpine

WORKDIR /app/app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    # Allow install without lockfile, so example works even without Node.js installed locally
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY ./components ./components
COPY ./constant ./constant
COPY ./context ./context
COPY ./helpers ./helpers
COPY ./hooks ./hooks
COPY ./layouts ./layouts
COPY ./pages ./pages
COPY public ./public
COPY ./services ./services
COPY tailwind.config.js .
COPY styles ./styles
COPY ./types ./types
COPY ./ui ./ui
COPY ./tsconfig.json .
COPY ./postcss.config.js .
COPY next.config.js .
COPY tsconfig.json .
COPY .env .

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Start Next.js in development mode based on the preferred package manager
CMD \
    if [ -f yarn.lock ]; then yarn dev; \
    elif [ -f package-lock.json ]; then npm run dev; \
    elif [ -f pnpm-lock.yaml ]; then pnpm dev; \
    else yarn dev; \
    fi
