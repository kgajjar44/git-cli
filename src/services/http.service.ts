import axios from 'axios';
import { HTTPMethods } from '../config/app.config';
import { HTTPConfig } from '../models/model';

export class HTTPService {

    private getCall(config: HTTPConfig): Promise<any> {
        const options = {
            headers: config.headers
        };
        return axios.get(config.url, options);
    }
    
    private postCall(config: HTTPConfig): Promise<any> {
        const options = {
            headers: config.headers
        };
        return axios.post(config.url, config.body, options);
    }
    
    public makeHttpCall(config: HTTPConfig): Promise<any> {
        if (HTTPMethods.GET == config.method) {
            return this.getCall(config);
        } else if (HTTPMethods.POST == config.method) {
            return this.postCall(config);
        }
        return new Promise((resolve) => { resolve("Wrong Method Passed") });
    }
    
    public makeHttpCallForkJoin(configArray: HTTPConfig[]): Promise<any[]> {
        let requestArray: any = [];
        configArray.map((config: HTTPConfig) => {
            this.makeHttpCall(config);
        })
        return axios.all(requestArray);
    }

}
