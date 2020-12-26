import { createReadStream, createWriteStream } from 'fs'
import { Transform } from 'stream'
import { civNumber } from './fonctions.js'
// import { createGunzip, createGzip } from 'zlib'
import {parserVCF, formatVCF} from './vcf.js'

createReadStream('./00003.vcf')
    .pipe(new parserVCF())
    .pipe(new Transform({
        objectMode: true,
        transform(chunk, enc, call) {
            chunk.tel = chunk.tel.map(elt => ({...elt, value:civNumber(elt.value)}))
            this.push(chunk)
            call()
        }
    }))
    .pipe(new formatVCF())
    .pipe(createWriteStream('result.vcf'))
