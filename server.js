import { createServer } from 'http'
import { createGunzip } from 'zlib'
import { basename } from 'path'
import { Transform } from 'stream'
import { civNumber } from './fonctions.js'
import { sequenceVCF } from './vcf.js'

var str = ""
const server = createServer((req, res) => {
    const filename = basename(req.headers['x-filename'])
    console.log(`File request received: ${filename} `)
    req
        .pipe(createGunzip())
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
                call()
            }
        }))
        .on('data', chunk => { str += chunk.toString() })
        .on('finish', () => {
            res.writeHead(201, { 'Content-Type': 'text/plain' })
            res.end(str)
            str = ""
        })
})
server.listen(3000, () => console.log('Listening on http://localhost: 3000'))