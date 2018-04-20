exports.parsePromise = (json) => {
    return new Promise(
        (resolve, reject) => {
            try {
                let parsed = JSON.parse(
                    json
                );
                resolve(parsed);
            } catch (err) {
                reject(err);
            }
        }
    )
}