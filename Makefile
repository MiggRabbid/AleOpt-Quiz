install:
	npm ci
	
lint-front:
	make -C frontend lint

build:
	npm -C frontend run build

start-dev:
	make -C frontend dev

start-backend:
	npm -C backend start

dev:
	make start-backend & make start-dev

localstart-back:
	make start-backend
