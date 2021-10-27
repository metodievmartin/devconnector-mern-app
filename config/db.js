const mongoose = require('mongoose');

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB connected...');
    } catch (err) {
        console.error('DB error...', err.message);

        process.exit(1);
    }
}

module.exports = connectDB;