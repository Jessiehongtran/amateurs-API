const db = require('../../database/dbConfig');

const getCommentsByEvent = (eventId) => {
    return db('comments')
            .where({event_id: eventId})
            .join('users', 'users.id', 'comments.user_id') //always need user id 1 as an anonymous
            .select('comments.id as id','comments.comment as comment', 'users.avatar as avatar', 'users.nick_name as nick_name')
}

const addComment = (comment) => {
    return db('comments')
            .returning('id')
            .insert(comment)
            .then(ids => ({id: ids[0]}))
}

module.exports = {
    getCommentsByEvent,
    addComment
}