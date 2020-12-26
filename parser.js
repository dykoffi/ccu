import { Transform } from 'stream'
import vcf from 'vcard-parser'

export default class parser extends Transform {
    constructor(options) {
        super({ ...options, objectMode: true })
        this.str = ""
    }

    _transform(chunk, encoding, callback) {
        this.str += chunk.toString()
        callback()
    }

    _flush(callback) {
        this.push(vcf.parse(this.str))
        callback()
    }
}