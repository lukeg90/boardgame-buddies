const fs = require('fs')

const save = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

const load = (filename) => { 
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, file) => {
            if (err) {
                console.log('There is a load error: ', err)
                reject(err)
            }
            resolve(JSON.parse(file))
        })
    })
}
module.exports = { save, load }