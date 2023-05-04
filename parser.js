const parser = (req) => {
    return new Promise((resolve, reject) => {
        try {
            req.on("data", (data) => {
                resolve(JSON.parse(data));
            });
        } catch (err) {
            reject(err);
        };
    });
};

module.exports = parser