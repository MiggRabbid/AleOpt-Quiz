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

# front next
nx-i:
	npm -C frontend-nextjs ci

nx-l:
	npm -C frontend-nextjs run lint

nx-f:
	npm -C frontend-nextjs run fix

nx-d:
	npm -C frontend-nextjs run dev

nx-b:
	rm -C frontend-nextjs -rf .next
	npm -C frontend-nextjs run build


nx-cl:
	rm -C frontend-nextjs -rf .next

# back
lint-back:
	npm -C backend run lint

fix-back:
	npm -C backend run fix

dev-back:
	npm -C backend run dev

build-back:
	npm -C backend run build

start-back:
	npm -C backend run start

# dev start with react
dev:
	make dev-front & make dev-back


# dev start with next
dev-nx:
	make nx-d & make dev-back
