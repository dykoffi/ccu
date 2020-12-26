import { Transform } from 'stream'
import vcf from 'vcard-parser'


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
        let tab = this.str.split('END:VCARD\r\n').map(elt => elt + "END:VCARD\r\n")
        tab.pop()
        this.push(tab)
        callback()
    }
}
export class parserVCF extends Transform {
    constructor(options) {
        super({ ...options, objectMode: true })
    }

    _transform(chunk, encoding, callback) {
        chunk.forEach(elt => {
            this.push(vcf.parse(elt))
        });
        callback()
    }

    _flush(callback) {
        callback()
    }
}

export class formatVCF extends Transform {
    constructor(options) {
        super({ ...options, objectMode: true })
    }

    _transform(chunk, encoding, callback) {
        this.push(vcf.generate(chunk) + "\r\n")
        callback()
    }

    _flush(callback) {
        callback()
    }
}