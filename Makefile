install: build-encoder build-decoder

run:
	php ./encoder/encoder.php $(SALT) $(ID_LENGTH) $(COUNT) | ./decoder/decoder $(SALT) $(ID_LENGTH)

build-encoder:
	@(cd encoder && composer install)

build-decoder:
	@(cd decoder && go build -o decoder .)