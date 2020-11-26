<?php
// https://github.com/vinkla/hashids
require_once __DIR__ . '/vendor/autoload.php';

use Hashids\Hashids;

if ($argc < 4) {
    printf("Usage: %s SALT ID_LENGTH COUNT\n", $argv[0]);
    die(1);
}
$salt = $argv[1];
$idLength = $argv[2];
$count = $argv[3];

$hashids = new Hashids($salt, $idLength);

for ($i = 1; $i <= $count; $i++) {
    $hashid = $hashids->encode($i);
    printf("%d %s\n", $i, $hashid);
}
