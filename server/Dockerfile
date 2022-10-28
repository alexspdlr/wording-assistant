FROM node:16

RUN apt-get update \
    && apt-get install -y chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends

# non-root user that comes with `node` images.
USER node 

WORKDIR /app

COPY --chown=node package.json .
COPY --chown=node package-lock.json .
COPY --chown=node tsconfig.json .
COPY --chown=node src .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

# check files list
RUN ls -a
RUN npm install
RUN npm run build

COPY --chown=node . /app

EXPOSE 3001

CMD [ "node", "build/index.js" ] 