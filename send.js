import { request } from 'http'
import { createGzip } from 'zlib'
import { createReadStream, createWriteStream } from 'fs'
import { basename } from 'path'

const host = process.argv[2]
const filename = process.argv[3]
const httpRequestOptions = {
    hostname: host,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip',
        'X-Filename': basename(filename),
    }
}
const req = request(httpRequestOptions, (res) => {
    res
        .pipe(createWriteStream("ccu-" + basename(filename)))
})

createReadStream(filename)
    .pipe(createGzip())
    .pipe(req)
    .on('finish', () => {
        console.log('File successfully sent')
    })