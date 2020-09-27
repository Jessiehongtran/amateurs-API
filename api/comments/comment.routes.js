const router = require('express').Router();
const commentModel = require('./comment.model');

//GET comments by eventId
router.get('/:eventId', async (req,res) => {
    const eventId = req.params.eventId
    try {
        const comments = await commentModel.getCommentsByEvent(eventId)
        res.status(200).json(comments)
    } catch (err){
        res.status(200).json(err.message)
    }
})

//POST comment
router.post('/', async (req,res) => {
    const comment = req.body
    try {
        const commentId = await commentModel.addComment(comment)
        res.status(200).json(commentId)
    } catch (err){
        res.status(200).json(err.message)
    }
})

module.exports = router;
