## Requirements

* PHP
* Composer
* Go

## hashids Libraries

### Encoder

* PHP (https://github.com/vinkla/hashids)

### Decoder

* Go (https://github.com/speps/go-hashids)
* Node.js (https://github.com/niieani/hashids.js)


## Usage

```
$ make install
$ make run SALT=salt ID_LENGTH=8 COUNT=100000
php ./encoder/hashids.php salt 8 100000 | ./decoder/decoder salt 8
=== 100000:63OqKywk

$ echo $?
0

$ make encode SALT=salt ID_LENGTH=8 SRC=100000
63OqKywk
```