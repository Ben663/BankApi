// import { userParse, usersWrite } from '../Controllers/utils.js';
import { validateUserExists } from '../Controllers/index.js';

export const getAllUsers = (req, res) => {
    res.status(200).send(utils.userParse());
};
export const getUser = (req, res) => {
    const user = utils
			.userParse()
			.find((user) => user.id === parseInt(req.params.id));
    user ? res.send(user) : res.status(404).send(`user ${req.params.id} not found`)
};
export const createUser = (req, res) => {
    const users = Utils.userParse();
    const newUser = { id: req.body.id, credit: 0, cash: 0 };
    if (!validateUserExists(users, newUser)) {
        users.push(newUser);
        res.status(200).send(newUser);
    } else {
        res.status(404).send('users alreade exists');
    }
    utils.usersWrite(users);
};

export const deposit = (req, res) => {
    const users = utils.userParse();
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send(`user ${req.params.id} not found`)
    } else if (req.body.amount < 0 || !req.body.amount) {
        res.status(400).send('invalid amount')
    } else {
        user.cash += req.body.amount
        res.status(200).send(user);
    }
    utils.usersWrite(users);
};
export const updateCredit = (req, res) => {
    const users = utils.userParse();
    const user = users.find((user) => user.id === parseInt(req.params.id))
    if (!user) {
        res.status(404).send(`User ${req.params.id} not found`);
    } else if (req.body.amount < 0 || !req.body.amount) {
        res.status(400).send('Invalid amount');
    } else {
        user.credit = req.body.amount;
        res.status(200).send(user);
    }
    utils.usersWrite(users);
};
export const withdrow = (req, res) => {
    const users = utils.userParse();
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send(`user ${req.params.id} not found`);
    } else if (req.body.amount < 0 || !req.body.amount) {
        res.status(400).send('invalid amount');
    } else if (user.credit + user.cash - req.body.amount < 0) {
        res.status(400).send('user not have credit');
    } else {
        user.cash -= req.body.amount;
        res.status(200).send(user);
    }
    utils.usersWrite(users);
    
};
export const transfer = (req, res) => {
    const users = utils.userParse();
    const fromUser = users.find((user) => user.id === parseInt(req.body.fromID));
    const userTo = users.find((item) => item.id === parseInt(req.body.toID));
    if (!fromUser) {
        res.status(404).send(`User ${req.body.fromID} not found`);
    } else if (!userTo) {
        res.status(404).send(`User ${req.body.toID} not found`);
    } else if (req.body.amount < 0 || !req.body.amount) {
        res.status(400).send('invaild amount')
    } else if (fromUser.credit + fromUser.cash - req.body.amount < 0) {
        res.status(400).send('user not have credit');
    } else {
        fromUser.cash -= req.body.amount;
        userTo.cash += req.body.amount;
        res.status(200).send({ fromUser, userTo });
    }
    utils.usersWrite(users);
};