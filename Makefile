install:
	npm ci

# front
lint-front:
	npm -C frontend run lint

fix-front:
	npm -C frontend run fix

dev-front:
	npm -C frontend run dev

build-front:
	npm -C frontend run build

# back
lint-back:
	npm -C backend run lint

fix-front:
	npm -C backend run fix

dev-back:
	npm -C backend run dev

build-back:
	npm -C backend run build

start-back:
	npm -C backend run start

# dev start
dev:
	make dev-front & make dev-back
