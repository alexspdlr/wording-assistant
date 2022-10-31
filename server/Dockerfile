FROM node:alpine

RUN apk add chromium

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_EXPERIMENTAL_CHROMIUM_MAC_ARM=true

# non-root user that comes with `node` images.
USER node 

WORKDIR /app

COPY --chown=node package.json .
COPY --chown=node package-lock.json .
COPY --chown=node tsconfig.json .
COPY --chown=node src .

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium 

# check files list
RUN ls -a
RUN npm install
RUN npm run build

COPY --chown=node . /app

EXPOSE 3001

CMD [ "npm", "start" ] 