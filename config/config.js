/*const config = {
env: process.env.NODE_ENV || 'development', 
port: process.env.PORT || 3000,
jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
mongoUri: process.env.MONGODB_URI ||
process.env.MONGO_HOST ||
'mongodb://' + (process.env.IP || 'localhost') + ':' + 
(process.env.MONGO_PORT || '27017') +
'/mernproject' 
}
export default config*/

const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI || 
    "mongodb+srv://ctoledo2:Rb4ciPQXa8ym2BU5@cluster0.4zixojc.mongodb.net/?retryWrites=true&w=majority" ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
    (process.env.MONGO_PORT || '27017') +
    '/mernproject' 
    }
    export default config
    
// "mongodb+srv://ctoledo12:M0y1WOHW7zfyQBPR@cluster0.jmaxege.mongodb.net/?retryWrites=true&w=majority"
// "mongodb+srv://Blessing:qzzJjISAcwfPklIo@cluster0.txlxgvp.mongodb.net/Skeleton?retryWrites=true&w=majority"