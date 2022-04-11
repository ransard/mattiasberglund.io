# 1) Build frontend
FROM node:latest as build-stage
WORKDIR /app
COPY client .
RUN npm install
RUN npm run build


# 2) Build Final Image
FROM golang:1.15.7
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

COPY --from=build-stage /app/build/ /app/build

RUN go build -o main .

EXPOSE 8080

CMD ["/app/main"]