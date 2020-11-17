import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository = new UserRepository();

export default () => {
    userRepository.count()
        .then(res => {
            // tslint:disable-next-line: no-shadowed-variable
            if ( res === 0) {
                console.log('Seeding Data in progress');

                userRepository.create({
                    name: 'Head Trainer',
                    role: 'head-trainer',
                    email: 'head.trainer@successive.tech',
                    password: 'head@123'
                }, undefined);

                userRepository.create({
                    name: 'Trainee',
                    role: 'trainee' ,
                    email: 'trainee@successive.tech',
                    password: 'trainee@123'
                }, undefined);

            }
        })
        .catch(err => console.log(err));
};
