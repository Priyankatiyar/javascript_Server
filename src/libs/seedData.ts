import UserRepository from '../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';
import configuration  from '../config/configuration';

const userRepository: UserRepository = new UserRepository();

export default () => {
    userRepository.countData()
        .then(res => {
            if ( res === 0) {
                console.log('Seeding Data in progress');

                userRepository.createUser({
                    name: 'Head Trainer',
                    role: 'head-trainer',
                    email: 'head.trainer@successive.tech',
                    password: configuration.PASSWORD,
                });

                userRepository.createUser({
                    name: 'Trainee',
                    role: 'trainee' ,
                    email: 'trainee@successive.tech',
                    password: configuration.PASSWORD
                });

            }
        })
        .catch(err => console.log(err));
};
