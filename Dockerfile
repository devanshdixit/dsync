FROM node:14.19.3
ENV NODE_ENV=production
WORKDIR /workspace
COPY ["package.json", "package-lock.json*", "./"]
RUN  npm cache clean --force
COPY . .
RUN npm install
COPY --chown=nextjs:nodejs entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
RUN NEXT_PUBLIC_API_KEY=PLACEHOLDER_NEXT_PUBLIC_API_KEY
RUN npm run build
ENV PORT 3000
CMD [ "npm", "start" ]