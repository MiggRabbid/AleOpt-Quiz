# front
nx-i:
	npm -C frontend ci

nx-l:
	npm -C frontend run lint

nx-f:
	npm -C frontend run fix

nx-d:
	npm -C frontend run dev

nx-s:
	npm -C frontend run start

nx-b:
	rm -rf frontend/.next
	npm -C frontend run build

nx-cl:
	rm -C frontend -rf .next

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


# dev start back and front
d:
	make dev-back & make nx-d

s:
	make dev-back & make nx-s 