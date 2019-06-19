interface Development {
    readonly name: string;
    readonly httpPort: number;
    readonly httpsPort: number;
    readonly envName: string;
    readonly mongoDB: object;
    readonly root: string;
    readonly multithreading: boolean;
    readonly pathToFileUploadFolderDev: string;
    
    
};

interface Production {
    readonly name: string;
    readonly httpPort: number;
    readonly httpsPort: number;
    readonly envName: string;
    readonly mongoDB: object;
    readonly root: string;
    readonly multithreading: boolean;
    readonly pathToFileUploadFolderProd: string;


};

interface Environment {
    readonly development: Development;
    readonly production: Production;
};



import path = require("path");
const rootPath = path.normalize(__dirname + '/../server');
//export const env = process.env.NODE_ENV || 'development';

export let environments: Environment = {
    development: {
        name: 'My RESTify Api in Development Mode',
        httpPort: +process.env.PORT || 8080,
        httpsPort: +process.env.PORT || 9090,
        envName: 'development',
        mongoDB: {
            dbHost: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/up2dance',
            mongooseConfig: {
                useCreateIndex: true,
                useNewUrlParser: true
            },
        },
        root: rootPath,
        multithreading: false,
        pathToFileUploadFolderDev: rootPath + '/uploads',
    },
    production: {
        name: 'My RESTify Api in Production Mode',
        httpPort: +process.env.PORT || 8081,
        httpsPort: +process.env.PORT || 9091,
        envName: 'production',
        mongoDB: {
            dbHost: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/up2dance',
            mongooseConfig: {
                useCreateIndex: true,
                useNewUrlParser: true
            },
        },
        root: rootPath,
        multithreading: true,
        pathToFileUploadFolderProd: rootPath + '/uploads',
    },
};

// Determine which environment was passed as a command-line argument
let currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
let environmentToExport = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.development;

// Export the module
export default environmentToExport;
