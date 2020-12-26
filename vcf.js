import { Transform } from 'stream'
export class sequenceVCF extends Transform {
    constructor(options) {
        super({ ...options, objectMode: true })
        this.str = ""
    }

    _transform(chunk, encoding, callback) {
        this.str += chunk.toString()
        callback()
    }

    _flush(callback) {
        let tab = this.str.split('\r\n').map(elt => elt + "\r\n")
        tab.pop()
        this.push(tab)
        callback()
    }
}