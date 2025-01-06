import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB is connected');
    } catch (error) {
        console.error('MongoDB connection failed', error.message);

    }
}

export default connectDB;