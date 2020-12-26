import { createReadStream, createWriteStream } from 'fs'
import { Transform } from 'stream'
import { civNumber } from './fonctions.js'

// import { createGunzip, createGzip } from 'zlib'
import parserVCF from './parser.js'

createReadStream('./00003.vcf')
    .pipe(new parserVCF())
    .pipe(new Transform({
        objectMode: true,
        transform(chunk, enc, call) {
            this.push(chunk.tel)
            call()
        }
    }))
    .pipe(new Transform({
        objectMode: true,
        transform(chunk, enc, call) {
            chunk.forEach(tel => this.push(tel))
            call()
        }
    }))
    .pipe(new Transform({
        objectMode: true,
        transform(chunk, enc, call) {
            chunk.value = civNumber(chunk.value)
            this.push(chunk)
            call()
        }
    }))
    .on('data', chunk => { console.log(chunk); })
    // .pipe(createWriteStream('test2.txt'))
