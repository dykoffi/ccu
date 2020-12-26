import { createReadStream, createWriteStream } from 'fs'
import { Transform } from 'stream'
import { civNumber } from './fonctions.js'
import {sequenceVCF } from './vcf.js'

createReadStream('./Contacts.vcf')
    .pipe(new sequenceVCF())
    .pipe(new Transform({
        objectMode: true,
        transform(chunk, enc, call) {
            chunk.forEach(line => {
                if (/^(TEL)/.test(line)) {
                    let tab = line.split(':')
                    let prefix = tab[0]
                    let num = tab[1].split("\r\n")[0]
                    this.push(prefix + ':' + civNumber(num) + '\r\n');
                } else {
                    this.push(line)
                }
            });
        }
    }))
    .pipe(createWriteStream('result.vcf'))
