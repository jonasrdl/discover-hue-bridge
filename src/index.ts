import axios from 'axios';
import express from 'express';

const URL: string = 'https://discovery.meethue.com/';
const PORT: number = 6969;

const discoverBridge = async () => {
    return await axios.get(URL);
};

const app = express();

(async () => {
    let data = await discoverBridge();
    let IPs: { ip: string }[] = [];

    data.data.forEach((bridge) => {
        let formattedBridge = {
            ip: bridge.internalipaddress
        };

        IPs.push(formattedBridge);
    });

    IPs.forEach((ip) => {
        axios
            .get(`http://${ip.ip}`)
            .then((result) => {
                if (result.status === 200) {
                    console.log(
                        `The IP of your bridge is: ${result.config.url}`
                    );

                    app.get('/bridge/ip', (req, res) => {
                        res.send({
                            ip: ip.ip
                        });
                    });
                }
            })
            .catch((error) => console.log(error.message));
    });
})();

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
