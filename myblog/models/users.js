/**
 * Created by hl on 2018/1/30.
 */
const User = require('../lib/mongo').User

module.exports = {
    // 注册一个用户
    create: function create (user) {
        return User.create(user).exec()
    }
}