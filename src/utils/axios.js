import axios from 'axios';

import { backendUrl } from '@/config';

const httpClient = axios.create({
    baseURL: backendUrl,
});

export default httpClient;
