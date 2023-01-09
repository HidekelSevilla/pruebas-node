
const mongoose = require('mongoose');




const dbConnection = async () => {

    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_KEY);
        console.log('Base de datos onlineee');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la Base de datos');
    }
}


module.exports = {
    dbConnection
}