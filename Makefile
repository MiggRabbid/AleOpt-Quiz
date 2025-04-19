# front
i-f:
	npm -C frontend install

l-f:
	npm -C frontend run lint

f-f:
	npm -C frontend run fix

d-f:
	npm -C frontend run dev

s-f:
	npm -C frontend run start

b-f:
	rm -rf frontend/.next
	npm -C frontend run build

cl-f:
	rm -C frontend -rf .next

# back
i-b:
	npm -C backend install

f-b:
	npm -C backend run fix

d-b:
	npm -C backend run dev

s-b:
	npm -C backend run start


# dev start back and front
d:
	make d-b & make d-f

s:
	make s-b & make s-f 