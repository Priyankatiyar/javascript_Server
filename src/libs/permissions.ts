 const permissions = {
'getUsers': {
all: ['head-trainer'],
read : ['trainee', 'trainer'],
write : ['trainer'],
delete: [],
}
};
export  default function hasPermission(moduleName: string, role: string, permissionType: string): boolean {
    try {
        const permission = permissions[moduleName];
        if (permission.all.includes(role)) {
            console.log(`${role} has ${permissionType} permissions`);
            return true;
        }
        else if (Object.values(permission[permissionType]).includes(role)) {
            console.log(`${role} has ${permissionType} permissions`);
            return true;
        }
        else {
            console.log(`${role} does not have ${permissionType} permissions`);
            return false;
        }
    }
    catch (err) {
        console.log(`Error: ${moduleName} is not a valid module Name`);
    }
}
