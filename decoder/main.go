// https://github.com/speps/go-hashids
package main

import (
	"bufio"
	"fmt"
	"github.com/speps/go-hashids"
	"log"
	"os"
	"strconv"
	"strings"
)

const threshold = 100000

func main() {
	if len(os.Args[1:]) < 3 {
		log.Fatalf("Usage: %s SALT ID_LENGTH COUNT", os.Args[0])
	}

	salt := os.Args[1]
	idLength, err := strconv.Atoi(os.Args[2])
	if err != nil {
		log.Fatalf("Invalid length of id:%s", os.Args[2])
	}
	expectedCount, err := strconv.Atoi(os.Args[3])
	if err != nil {
		log.Fatalf("Invalid count of id:%s", os.Args[3])
	}

	hd := hashids.NewData()
	hd.Salt = salt
	hd.MinLength = idLength
	h, err := hashids.NewWithData(hd)
	if err != nil {
		log.Fatal(err)
	}

	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0
	ids := map[string]int64{}

	for scanner.Scan() {
		text := scanner.Text()
		splits := strings.Split(text, " ")
		if len(splits) < 2 {
			continue
		}

		number, err := strconv.ParseInt(splits[0], 10, 64)
		id := splits[1]

		if err != nil {
			fmt.Printf("Invalid input number: %s %s\n", splits[0], id)
			continue
		}

		if v, exists := ids[id]; exists {
			fmt.Printf("Detect collision id: %d %s (prev:%d)\n", number, id, v)
			continue
		}
		ids[id] = number

		decoded, err := h.DecodeInt64WithError(id)
		if err != nil {
			fmt.Printf("Decode Error: %d %s\n", number, id)
			continue
		}

		decodedNumber := decoded[0]

		if number != decodedNumber {
			fmt.Printf("Mismatch decoded number: %d %d(%s)\n", number, decodedNumber, id)
		}

		if number%threshold == 0 {
			fmt.Printf("=== %d:%s -> %d\n", number, id, decodedNumber)
		}

		validCount++
	}


	if validCount != expectedCount {
		fmt.Printf("\n[Error] expected count:%d valid count: %d\n", expectedCount, validCount)
		os.Exit(1)
	} else {
		fmt.Printf("\n[OK] expected count:%d valid count: %d\n", expectedCount, validCount)
		os.Exit(0)
	}
}
