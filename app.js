import express from 'express'
import cors from 'cors'
import {
	getAllUsers,
	getUser,
	createUser,
	deposit,
	updateCredit,
	withdrow,
	transfer
} from './Routes/Router.js';
// import utils from './Controllers/utils.js'


const PORT = process.env.PORT || 6606;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', getAllUsers);
app.get('/user/:id', getUser);

app.post('/user/', createUser);

app.put('/user/deposit/:id', deposit);
app.put('/user/credit/:id', updateCredit);
app.put('/user/withdrow/:id', withdrow);
app.put('/user/transfer/', transfer);

//up server start
app.listen(PORT, () => {
    console.log('This server is running in port:' + PORT);
});

