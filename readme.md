## Requirements

* PHP
* Composer
* Go

## hashids Libraries

* PHP (https://github.com/vinkla/hashids)
* Go (https://github.com/speps/go-hashids)


## Usage

```
$ make install
$ make run SALT=salt ID_LENGTH=8 COUNT=100000
php ./encoder/hashids.php salt 8 100000 | ./decoder/decoder salt 8
=== 100000:63OqKywk

$ echo $?
0
```