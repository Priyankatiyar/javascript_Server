import { Ipermission, Iusers } from './interfaces';

export const permissions: Ipermission = {
    'getUsers': {
        all: ['head-trainer'],
        read : ['trainee', 'trainer'],
        write : ['trainer'],
        delete: [],
    }
};

export const users: Iusers[] = [
    {
        traineeEmail: 'trainee1@@successive.tech',
        reviewerEmail: 'reviewer1@successive.tech',
    },
    {
        traineeEmail: 'trainee01@successive.tech',
        reviewerEmail: 'reviewer2@successive.tech',
    },
    {
        traineeEmail: 'trainee001@@successive.tech',
        reviewerEmail: 'reviewer3@successive.tech',
    }
];
