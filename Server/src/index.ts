import { ApiServer } from "./server/index";

const apiServer = new ApiServer();
apiServer.start(+process.env.PORT || 8080);
