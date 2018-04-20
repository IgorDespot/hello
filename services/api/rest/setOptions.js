function setOptionsPost(service, service_path, data, orionPath) {
    return {
        method: 'POST',
        uri: orionPath + 'entities?options=keyValues',
        headers: {
            "Content-Type": 'application/json',
            "Fiware-Service": service,
            "Fiware-ServicePath": service_path
        },
        body: data,
        json: true
    }
}

function setOptionsPatch(service, service_path, data, orionPath) {
    return {
        method: 'POST',
        uri: orionPath + 'entities/' + data.id + '/attrs?options=keyValues',
        headers: {
            "Content-Type": 'application/json',
            "Fiware-Service": service,
            "Fiware-ServicePath": service_path
        },
        body: Object.assign({}, data, {
            id: undefined,
            type: undefined
        }),
        json: true
    }
}

function setOPtionsGetAll(service, service_path, orionPath) {
    return {
        method: "GET",
        uri: orionPath + 'entities/',
        headers: {
            "Fiware-Service": service,
            "Fiware-ServicePath": service_path
        },
        json: true
    }
}

function setOtionsGetByType(service, service_path, orionPath, type) {
    return {
        method: "GET",
        uri: orionPath + 'entities/?type=' + type,
        headers: {
            "Fiware-Service": service,
            "Fiware-ServicePath": service_path
        },
        json: true
    }
}

function setOPtionsGetSingle(service, service_path, orionPath, id) {
    return {
        method: "GET",
        uri: orionPath + 'entities/' + id,
        headers: {
            "Fiware-Service": service,
            "Fiware-ServicePath": service_path
        },
        json: true
    }
}

exports = module.exports = {
    setOptionsPost,
    setOptionsPatch,
    setOPtionsGetAll,
    setOtionsGetByType,
    setOPtionsGetSingle
}