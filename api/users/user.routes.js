const router = require('express').Router();
const bcrypt = require('bcryptjs')
const { protected } = require('../../middlewares/restricted');

const {
    getUsers,
    addUser,
    findUserBy,
    removeUser,
    updateUser
} = require('./user.model');



//GET users 
//only if the device is logged in
router.get('/', protected, async (req,res) => {  
    try {
        const users = await getUsers() 
        res.status(200).json(users)
    } catch (err){
        res.status(500).json(err.message)
    }
    
})



//POST user
router.post('/', async (req,res) => {
    const user = req.body
    const existedUser = await findUserBy({email: user.email})
    if (existedUser){
        res.status(500).json({message: 'Email was already taken'})
    } else {
        const hash = bcrypt.hashSync(user.password, 10)
        user.password = hash
        const userId = await addUser(user)
        req.session.userId = user.userId
        res.status(200).json(userId)
    }
})

//GET a user by id
router.get('/:userId', async (req,res) => {
    const userId = req.params.userId
    try {
        const user = await findUserBy({id: userId})
        res.status(200).json(user)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//LOGIN
router.post('/login', (req,res) => {
    const creds = req.body;
    findUserBy({email: creds.email})
        .then(user => {
            console.log(user)
            if (user && bcrypt.compareSync(creds.password, user.password)){
                req.session.userId = user.id
                console.log(req.session)
                res.status(200).json({
                    welcome: user.email,
                    session: req.session
                })
            } else {
                res.status(401).json({message: 'you shall not pass!'});
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })

})

//LOGOUT
router.post('/logout', async (req,res) => {
    console.log('in logout', req.session)
    try {
        await req.session.destroy(err => {
            if (err){
                res.status(500).json({message: "You can't leave"})
            } else {
                res.status(200).json({message:'good bye'})
            }
        })
    } catch(err) {
        res.status(500).json(err.message)
    }
})

//DELETE a user
router.delete('/:userId', async (req,res) => {
    const userId = req.params.userId
    try {
        await removeUser(userId)
        res.status(200).json({message: 'Deleted 1 user'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

//UPDATE a user
router.patch('/:userId', async (req,res) => {
    const userId = req.params.userId
    const change = req.body
    try {
        await updateUser(userId, change)
        res.status(200).json({message: 'Updated 1 user'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router;