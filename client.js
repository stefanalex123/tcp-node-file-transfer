const net = require('net');

const fs = require("node:fs/promises");

const socket = net.createConnection({host: "::1", port:5050}, async () => {
    const filePath = "./text.txt";
    const fileHanle = await fs.open(filePath, "r");
    const fileStream = fileHanle.createReadStream();

    fileStream.on("data", (data) => {
        socket.write(data);
    });

    fileStream.on("end", () => {
        console.log("The file was succesfully uploaded!");
        socket.end();
    })

});
