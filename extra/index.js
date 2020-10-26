import {diamond, formequilateral } from './patterns';
import {hasPermission,ValidateUser} from './utils';
import {permissions} from './constants';
import {users} from './constants';

console.log('Diamond Function Calling:');
diamond(5);
console.log('Equilateral Function Calling:');
formequilateral(6);
console.log('Permission Function Calling:');
hasPermission(permissions.getUsers,"trainee","read");
console.log('Validation function:');
ValidateUser(users);
