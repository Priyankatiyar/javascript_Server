interface Ipermission {
    'getUsers': {
        all: string[],
        read: string[],
        write: string[],
        delete: string[]
    };
}
interface Iusers {
    traineeEmail: string;
    reviewerEmail: string;
}
export{ Ipermission, Iusers };
