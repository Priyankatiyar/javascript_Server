import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository = new UserRepository();

export default () => {
    userRepository.count()
        .then(res => {
            // tslint:disable-next-line: no-shadowed-variable
            if ( res => {
                 console.log('Seeding Data in progress');
            }) {
                console.log('');
            }
        });
    console.log('Seeding Data in progress!');

    userRepository.create({ name: 'Head Trainer', role: 'head-trainer', email: 'head.trainer@successive.tech', password: 'head@123'});
    userRepository.create({ name: 'Trainee', role: 'trainee' , email: 'trainee@successive.tech', password: 'trainee@123'});
};
