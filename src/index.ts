import axios from 'axios';

const URL: string = 'https://discovery.meethue.com/';

const discoverBridge = async () => {
    return await axios.get(URL);
};

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
                    process.exit(1);
                }
            })
            .catch();
    });
})();
