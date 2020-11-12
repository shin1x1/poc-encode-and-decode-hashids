const Hashids = require('hashids')
const fs = require('fs')

if (process.argv.length < 4) {
    console.error("Usage: " + process.argv[1] + " SALT ID_LENGTH COUNT")
    process.exit(1)
}

const salt = process.argv[2]
const idLength = Number(process.argv[3])
const expectedCount = Number(process.argv[4])

const hashids = new Hashids(salt, Number(idLength))
const threshold = 100000

process.stdin.resume()

let validCount = 0
const ids = []
process.stdin.on('data', (chunk) => {
    String(chunk).trim().split("\n").forEach(line => {
        const [numberString, id] = line.trim().split(" ")
        const number = Number(numberString)

        if (isNaN(number) || id === undefined) {
            return
        }

        const idx1 = id.substring(0, 2)
        const idx2 = id.substring(2, 4)
        const idx3 = id.substring(4)
        if (idx1 in ids) {
            if (idx2 in ids[idx1]) {
                if (idx3 in ids[idx1][idx2]) {
                    console.log("Detect collision id: %d %s (prev:%d)", number, id, ids[idx1][idx2][idx3])
                    return
                }
            } else {
                ids[idx1][idx2] = []
            }
        } else {
            ids[idx1] = []
            ids[idx1][idx2] = []
        }
        ids[idx1][idx2][idx3] = number

        const decoded = hashids.decode(id)[0]
        if (isNaN(decoded)) {
            console.log("Decode Error: %d %s", number, id)
            return
        }

        // console.log("id:%s number:%d decoded:%d", id, number, decoded)

        if (number !== decoded) {
            console.log("Mismatch decoded number: %d %d(%s)", number, decoded, id)
            return
        }

        if (number % threshold === 0) {
            console.log("=== %d:%s -> %d", number, id, decoded)
        }

        validCount++;
    })
});

process.stdin.on('end', () => {
    if (validCount !== expectedCount) {
        console.log("\n[Error] expected count:%d valid count: %d\n", expectedCount, validCount)
        process.exit(1)
    } else {
        console.log("\n[OK] expected count:%d valid count: %d\n", expectedCount, validCount)
    }
})

