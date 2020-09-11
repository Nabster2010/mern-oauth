const router = require('express').Router();

const userController = require('../controllers/user.controller');
const authCheck = require('../middlewares/authCheck');
//create new user for db testing

router.post('/', userController.createUser);

//get all users from db
router.get('/', authCheck, userController.getAllUsers);

module.exports = router;
