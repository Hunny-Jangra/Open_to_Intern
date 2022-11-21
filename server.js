const app = require('./app');
const mongoose = require('mongoose');

const DataBase = process.env.DB;
mongoose.connect(DataBase, {
    UseNewUrlParser : true
}).then( () => {
    console.log('DB is Connected Successfully....');
})

app.listen(process.env.PORT, (req, res) => {
    console.log(`App is running on PORT ${process.env.PORT}....`);
})