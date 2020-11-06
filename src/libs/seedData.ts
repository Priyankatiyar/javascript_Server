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

    userRepository.create({ name: 'Head Trainer', role: 'head-trainer'});
    userRepository.create({ name: 'Trainee', role: 'trainee'});
};
