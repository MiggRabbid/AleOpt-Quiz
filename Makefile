install:
	npm ci
	
lint-front:
	make -C frontend lint

build:
	npm -C frontend run build

start-dev:
	make -C frontend dev

start-backend:
	npx start-server

localstart:
	make start-dev