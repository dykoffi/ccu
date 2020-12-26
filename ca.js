import { parserVCF } from './vcf2.js'

import { createReadStream, createWriteStream } from 'fs'
import { Transform } from 'stream'
import { civNumber } from './fonctions.js'
// import { createGunzip, createGzip } from 'zlib'

createReadStream('./00003.vcf')
    .pipe(new parserVCF())
    .pipe(new Transform({
        objectMode: true,
        transform(chunk, enc, call) {
            chunk.forEach(elt => this.push(elt))
            call()
        }
    }))
    .on('data', chunk => console.log(chunk))
    // .pipe(new formatVCF())
    // .pipe(createWriteStream('result.vcf'))
