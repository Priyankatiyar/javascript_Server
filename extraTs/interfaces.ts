interface Ipermission {
    'getUsers': {
        all: String[],
        read: String[],
        write: String[],
        delete: String[]
    };
}
interface Iusers {
    traineeEmail: String;
    reviewerEmail: String;
}
export{ Ipermission, Iusers };
