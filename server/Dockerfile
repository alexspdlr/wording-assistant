FROM node:slim

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true 

RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*



WORKDIR /app
COPY --chown=node package.json .
COPY --chown=node package-lock.json .
COPY --chown=node tsconfig.json .
COPY --chown=node src .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# check files list
RUN ls -a
RUN npm ci
RUN npm run build

COPY --chown=node . /app

EXPOSE 3001

CMD [ "node", "build/index.js" ]  