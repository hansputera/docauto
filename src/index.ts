import {Toolkit} from 'actions-toolkit';

Toolkit.run(async tool => {
	tool.log.info('Successfuly!');
}, {event: 'push'}).catch(() => process.exit(1));
