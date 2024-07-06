build:
	docker build -f packages/nodeapp/Dockerfile -t server:latest .
	docker create --name="nodeapp" -p 3000:3000 server:latest

start:
	docker start nodeapp

stop:
	docker stop nodeapp