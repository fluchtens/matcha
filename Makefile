all: build

install:
	cd api && pnpm install

build:
	docker-compose up --build

up: down
	docker-compose up

down:
	docker-compose down

clean:
	docker-compose down --rmi all

fclean:
	docker-compose down --rmi all --volumes

.PHONY: all install build up down clean fclean

.SILENT:
