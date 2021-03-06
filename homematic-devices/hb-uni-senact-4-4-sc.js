const Accessory = require('./lib/accessory');

module.exports = class HbUniSenAct extends Accessory {
    init(config, node) {
        const {ccu} = node;

        const channels = config.description.CHILDREN;

        for (let i = 1; i <= 4; i++) {
            const ch = config.description.ADDRESS + ':' + i;
            if (!this.option(ch)) {
                continue;
            }

            const name = ccu.channelNames[channels[i]];
            const dp = config.iface + '.' + channels[i] + '.STATE';

            this.addService('Switch', name)
                .get('On', dp)
                .set('On', dp);
        }

        for (let i = 5; i <= 8; i++) {
            const ch = config.description.ADDRESS + ':' + i;
            if (!this.option(ch)) {
                continue;
            }

            const name = ccu.channelNames[channels[i]];
            const dp = config.iface + '.' + channels[i] + '.STATE';

            this.addService('ContactSensor', name)
                .get('ContactSensorState', dp, (value, c) => {
                    return value ? c.CONTACT_NOT_DETECTED : c.CONTACT_DETECTED;
                })
        }
    }
};
