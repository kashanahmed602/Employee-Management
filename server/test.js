const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.cluster0.2fi2yzh.mongodb.net", (err, addresses) => {
    console.log(err);
    console.log(addresses);
});