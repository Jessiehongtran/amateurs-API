const db = require('../../database/dbConfig');

const getEvents = () => {
    return db('events as e')
            .join('users as u', 'e.host_id', 'u.id')
            .select(
                "e.*",
                "u.nick_name",
                "u.email",
                "u.year_of_birth",
                "u.moto",
                "u.avatar"
            )
            // .join('event_participants as ep', 'e.id', 'ep.event_id')
            // .join('users as us', 'ep.participant_id', 'us.id')
}

const addEvent = (event) => {
    return db('events')
            .returning('id')
            .insert(event)
            .then(ids => ({id: ids[0]}))
}

const addEventParticipants = (event_people) => {
    return db('event_participants')
            .returning('id')
            .insert(event_people)
            .then(ids => ({id: ids[0]}))
}

const getEventParticipants = (eventId) => {
    return db('event_participants as ep')
            .where({event_id: eventId})
            .join('users as u','ep.participant_id', 'u.id')

}

const getHostOfEvent = (eventId) => {
    return db('events as e')
            .where('e.id', eventId)
            .first()
            .join('users as u', 'e.host_id', 'u.id')
            
        
}

const getEventById = (eventId) => {
    return db('events as e')
            .where('e.id', eventId)
            .then(events => events[0])
}

const removeEvent = (eventId) => {
    return db('events')
            .where({id: eventId})
            .del()
}


const updateEvent = (eventId, change) => {
    return db('events')
            .where({id: eventId})
            .update(change)
}

module.exports = {
    getEvents,
    addEvent,
    getHostOfEvent,
    addEventParticipants,
    getEventParticipants,
    getEventById,
    removeEvent,
    updateEvent
}

