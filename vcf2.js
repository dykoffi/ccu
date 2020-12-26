import { Transform } from 'stream'
import vcf from 'vcf'

export class parserVCF extends Transform {
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

// export class formatVCF extends Transform {
//     constructor(options) {
//         super({ ...options, objectMode: true })
//     }

//     _transform(chunk, encoding, callback) {
//         this.push(vcf.generate(chunk))
//         callback()
//     }

//     _flush(callback) {
//         callback()
//     }
// }