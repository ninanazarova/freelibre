FROM node:18.16.0-bookworm
COPY . .
RUN npm i
CMD ["npm", "run", "start"]
