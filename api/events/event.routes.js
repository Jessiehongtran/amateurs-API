const router = require('express').Router();
const { 
    getEvents,
    addEvent,
    addEventParticipants,
    getEventParticipants,
    getHostOfEvent,
    getEventById,
    removeEvent,
    updateEvent
} = require('./event.model')

//GET events (join with users to see host, join with event_participants to see who are joining)
router.get('/', async (req,res) => {
    try {
        const events = await getEvents()
        res.status(200).json(events)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST new user joining an event
router.post('/participants', async (req,res) => {
    const event_people = req.body
    try {
        const id = await addEventParticipants(event_people)
        res.status(200).json(id)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//GET all participants of an event
router.get('/participants/:eventId', async (req,res) => {
    const eventId = req.params.eventId
    try {
        const people = await getEventParticipants(eventId)
        res.status(200).json(people)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST event 
router.post('/', async (req,res) => {
    const event = req.body
    try {
        const eventId = await addEvent(event)
        res.status(200).json(eventId)
    } catch (err){
        res.status(500).json(err.message)
    }
})


//GET event by id (join with event_participants to see who are joining)
router.get('/:eventId', async (req,res) => {
    const eventId = req.params.eventId
    console.log(eventId)
    try {
        const event = await getEventById(eventId)
        console.log(event)
        res.status(200).json(event)
    } catch (err){
        res.status(500).json(err.message)
    }
})


//DELETE event
router.delete('/:eventId', async (req,res) => {
    const eventId = req.params.eventId
    try {
        await removeEvent(userId)
        res.status(200).json({message: 'Deleted 1 event'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

//UPDATE event
router.patch('/:eventId', async (req,res) => {
    const eventId = req.params.eventId
    const change = req.body
    try {
        await updateEvent(eventId, change)
        res.status(200).json({message: 'Updated 1 event'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router;