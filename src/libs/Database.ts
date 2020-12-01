import * as mongoose from 'mongoose';
import seedData from './seedData';

class Database {
    static open (MONGO_URL) {
        return new Promise((resolve, reject) => {
            console.log('mongoDB Url is:', MONGO_URL);
            console.log('Inside open method');
            mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                seedData();
                resolve(undefined);
            });
        });
    }

    static disconnect() {
        console.log('Inside disconnect');
        }
    }

export default Database;
