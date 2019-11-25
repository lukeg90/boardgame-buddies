const fs = require('fs')
const Flatted = require('flatted/cjs');

module.exports = class Service {

  async findAll() {
    return this.model.find()
  }

  async add(item) {
    return this.model.create(item)
  }

  async del(itemId) {
    return this.model.deleteMany({ _id: itemId })
  }

  async find(itemId) {
    return this.model.findById(itemId)
  }

  // async deleteAll() {
  //   return this.model.deleteMany({})
  // }

}
