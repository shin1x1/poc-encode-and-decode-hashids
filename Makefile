install: build-encoder build-decoder-go build-decoder-node

run: run-php-to-node

run-php-to-go:
	php ./encoder/encoder.php $(SALT) $(ID_LENGTH) $(COUNT) | ./decoder/go/decoder $(SALT) $(ID_LENGTH) $(COUNT)

run-php-to-node:
	php ./encoder/encoder.php $(SALT) $(ID_LENGTH) $(COUNT) | node --max-old-space-size=4096 ./decoder/node/decoder.js $(SALT) $(ID_LENGTH) $(COUNT)

build-encoder:
	@(cd encoder && composer install)

build-decoder-go:
	@(cd decoder/go && go build -o decoder .)

build-decoder-node:
	@(cd decoder/node && npm i)

test:
	@./test.sh