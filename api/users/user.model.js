const db = require('../../database/dbConfig');

const getUsers = () => {
    return db('users')
}

const addUser = (user) => {
    return db('users')
            .returning('id')
            .insert(user)
            .then(ids => ({id: ids[0]}))
}

const findUserBy = (filter) => {
    return db('users')
            .where(filter)
            .then(users => users[0])
}

const removeUser = (userId) => {
    return db('users')
            .where({id: userId})
            .del()
}

const updateUser = (userId, change) => {
    return db('users')
            .where({id: userId})
            .update(change)
}

module.exports = {
    getUsers,
    addUser,
    findUserBy,
    removeUser,
    updateUser
}