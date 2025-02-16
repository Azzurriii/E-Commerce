import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { emailQueue } from '@queues/email.queue';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/queues');

createBullBoard({
	queues: [new BullAdapter(emailQueue)],
	serverAdapter: serverAdapter,
});

export default serverAdapter;
