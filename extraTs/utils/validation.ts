import { ValidateEmail } from './helpers';
// export const users = [
//     {
//         traineeEmail: 'trainee1@@successive.tech',
//         reviewerEmail: 'reviewer1@successive.tech',
//     },
//     {
//         traineeEmail: 'trainee01@successive.tech',
//         reviewerEmail: 'reviewer2@successive.tech',
//     },
//     {
//         traineeEmail: 'trainee001@@successive.tech',
//         reviewerEmail: 'reviewer3@successive.tech',
//     }
// ];
// function ValidateEmail(email)
// {
//     let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//     return reg.test(email);
// }
export function ValidateUser(users)
{
    let valid:String[] = [];
    let invalid:String[] = [];
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
    console.log("valid users count is : ",valid.length);
    console.log(valid);
    console.log("Invalid users count is : ",invalid.length);
    console.log(invalid);
}
//ValidateUser(users);
