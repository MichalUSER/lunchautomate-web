import { dev } from '$app/environment';
import { PUBLIC_API_URL } from '$env/static/public';

const URL = dev ? 'http://127.0.0.1:8000' : PUBLIC_API_URL;

export { URL };
