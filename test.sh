#!/bin/bash

set -e

test_command () {
  expected=$1
  actual=$2

  if [ "$expected" = "$actual" ]; then
    echo "OK"
  else
    echo "NG"

    echo "=== expected"
    echo "$expected"

    echo "=== actual"
    echo "$actual"

    exit 1
  fi;
}

EXPECTED="[OK] expected count:3 valid count: 3"
ACTUAL=$(printf "1 zxkXG8ZW\n2 Gzmdv8vp\n3 nVmw2kNp\n" | ./decoder/decoder salt 8 3 2>&1 | xargs)
test_command "${EXPECTED}" "${ACTUAL}"

EXPECTED="Mismatch decoded number: 1 50000000(3O59pVyk) Detect collision id: 2 3O59pVyk (prev:1) Decode Error: 3 3OjA0PZ1 [Error] expected count:3 valid count: 1"
ACTUAL=$(printf "1 3O59pVyk\n2 3O59pVyk\n3 3OjA0PZ1\n" | ./decoder/decoder salt 8 3 2>&1 | xargs)
test_command "${EXPECTED}" "${ACTUAL}"

EXPECTED="[Error] expected count:2 valid count: 1"
ACTUAL=$(printf "1 zxkXG8ZW\n2\n" | ./decoder/decoder salt 8 2 2>&1 | xargs)
test_command "${EXPECTED}" "${ACTUAL}"
