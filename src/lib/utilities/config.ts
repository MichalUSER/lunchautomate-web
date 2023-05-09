import { dev } from '$app/environment';

const URL = dev ? 'http://localhost:5173/api' : 'http://127.0.0.1:8000';

export { URL };
