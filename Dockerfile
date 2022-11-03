FROM node:16

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


USER node

WORKDIR /app

COPY --chown=node . .

# check files list
RUN npm install
RUN npm run build

COPY --chown=node . /app

EXPOSE 3001

CMD [ "npm", "start" ] 

#FROM --platform=linux/amd64 node:alpine

#RUN apk add chromium

#ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# non-root user that comes with `node` images.
# USER node 

#WORKDIR /app

# COPY --chown=node . .
#COPY . .

# check files list
#RUN npm install
#RUN npm run build

# COPY --chown=node . /app 
#COPY . /app 

#EXPOSE 3001 

# CMD [ "npm", "start" ] 