<<<<<<< HEAD
import { ValidateEmail } from './helpers';
export function ValidateUser(users)
=======
let users = [
    {
        traineeEmail: 'trainee1@@successive.tech',
        reviewerEmail: 'reviewer1@successive.tech',
    },
    {
        traineeEmail: 'trainee01@successive.tech',
        reviewerEmail: 'reviewer01@successive.tech',
    },
    {
        traineeEmail: 'trainee001@@successive.tech',
        reviewerEmail: 'reviewer001@successive.tech',
    }
];
let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
function ValidateEmail(email) {
    return reg.test(email);
}
let valid = [];
let invalid = [];
function ValidateUser(users)
>>>>>>> 907e78f8d8a1f3223bcd1d8eea978402cae0bf25
{
    let valid = [];
    let invalid = [];
    for(let i=0; i<users.length; i++)
    {
        if(ValidateEmail(users[i].traineeEmail) && ValidateEmail(users[i].reviewerEmail))
        {
            valid.push(users[i]);
        }
        else
        {
            invalid.push(users[i]);
        }
    }
    console.log("valid emailId count  : ",valid.length);
    console.log(valid);
    console.log("Invalid emailId count : ",invalid.length);
    console.log(invalid);
}
<<<<<<< HEAD
=======
ValidateUser(users)
>>>>>>> 907e78f8d8a1f3223bcd1d8eea978402cae0bf25
