import { ApiServer } from "./server/index";
import * as config from '../config';

const apiServer = new ApiServer();
apiServer.start(config.port);
