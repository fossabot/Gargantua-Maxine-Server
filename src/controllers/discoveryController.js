const { info, error } = require('../util/logging/loggingUtil');
const { httpStatus, constants } = require('../util/constants/constants');
const { RegistryService } = require('../services/registryService');

const registryService = new RegistryService();

const discoveryController = (req, res) => {
    let {hostName, nodeName, port, serviceName, timeOut} = req.body;    
    port = parseInt(port);
    timeOut = parseInt(timeOut) || constants.HEARTBEAT_TIMEOUT;
    if(!(hostName && nodeName && port && serviceName)){
        error(httpStatus.MSG_MISSING_DATA);
        res.status(httpStatus.STATUS_GENERIC_ERROR).json({"message" : httpStatus.MSG_MISSING_DATA});
        return;
    }

    const serviceResponse = registryService.registryService(serviceName, nodeName, `${hostName}:${port}`, timeOut);
    info(serviceResponse);
    res.status(httpStatus.STATUS_SUCCESS).json(serviceResponse);
}


const serverListController = (req, res) => {    
    res.type('application/json');
    res.send(JSON.stringify(registryService.getCurrentlyRegisteredServers()));    
}

module.exports = {
    discoveryController,
    serverListController
};