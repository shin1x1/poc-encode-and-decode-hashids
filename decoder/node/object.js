const Hashids = require('hashids')
const obj = []

const hashids = new Hashids('salt', 8)

// for (let i = 0 ; i < 10000000 ; i++) {
for (let i = 0; i < 10000000; i++) {
    const id = hashids.encode(i)

    const index = id.substring(0, 2)
    if (!(index in obj)) {
        obj[index] = []
    }
    obj[index][id] = i
}
console.log('done')
