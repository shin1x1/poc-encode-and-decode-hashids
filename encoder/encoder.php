<?php
// https://github.com/vinkla/hashids
require_once __DIR__ . '/vendor/autoload.php';

use Hashids\Hashids;

if ($argc < 4) {
    printf("Usage: %s SALT ID_LENGTH SRC\n", $argv[0]);
    die(1);
}
$salt = $argv[1];
$idLength = $argv[2];
$src = $argv[3];

printf("%s\n", (new Hashids($salt, $idLength))->encode($src));
