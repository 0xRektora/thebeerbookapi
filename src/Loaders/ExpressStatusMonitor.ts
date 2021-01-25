import { Application } from 'express';
import monitor from 'express-status-monitor';

// Should we activate or not the Express Status Monitor
const applyMonitor = Boolean(process.env.MONITOR);

export default function useExpressStatusMonitor(app: Application): void {
    applyMonitor && app.use(monitor());
}
