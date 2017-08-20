const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Fuck You')
})

app.listen(3000, () => {
	console.log('Server Started at port 3000')
})