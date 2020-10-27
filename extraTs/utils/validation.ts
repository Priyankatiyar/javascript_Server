import { ValidateEmail } from './helpers';
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
