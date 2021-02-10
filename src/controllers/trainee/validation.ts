const config = {
    create: {
        name: {
            required: true,
            regex: '',
            in: ['body'],
            errorMessage: 'Name is required'
        },
        role: {
            required: false,
            sting: true,
            in: ['body'],
            errorMessage: 'Role is required',
        },
        email: {
            required: true,
            regex: /^[a-zA-Z0-9+_.-]+@successive.tech+$/,
            in: ['body'],
            errorMessage: 'Email error',
        },
        password: {
            required: true,
            string: true,
            in: ['body'],
            errorMessage: 'Password is required'
        }
    },
    delete: {
        id: {
            required: true,
            errorMessage: 'Id is required',
            in: ['params']
        }
    }  ,
    get: {
        
    },
    update: {
        id: {
            required: false,
            string: true,
            in: ['body']
        },
    }
};
export default config;
