# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.8-slim
EXPOSE 5000
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
COPY requirements.txt .
RUN python -m pip install -r requirements.txt
WORKDIR /app
COPY . /app
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]



FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["react/package.json", "react/package-lock.json*", "react/npm-shrinkwrap.json*", "react/"]
RUN npm install --production --silent && mv node_modules ../
COPY react .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
