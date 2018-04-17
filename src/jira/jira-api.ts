import axios from 'axios';
import { resolve, URL, URLFormatOptions } from 'url';
import Options from './options.dto';

export default class JiraApi {
    protocol: string = 'https';
    host: string;
    port: number = 443;
    username: string;
    password: string;
    apiVersion: string = '2';
    verbose: boolean = false;
    strictSSL: boolean = true;
    oauth: any = {};

    constructor(private options: Options) {
        this.protocol = options.protocol || 'https';
        this.host = options.host;
        this.port = options.port || 443;
        this.username = options.username;
        this.password = options.password;
        this.apiVersion = options.apiVersion || '2';
        this.strictSSL = options.strictSSL || true;
        this.oauth = options.oauth || {};

        // Default strictSSL to true (previous behavior) but now allow it to be
        // modified
        if (!this.strictSSL) {
            this.strictSSL = true;
        }
    }

    private makeUri(pathname: string, altBase: string = '', altApiVersion: string = '') {
        let basePath: string = 'rest/api/';
        if (altBase) {
            basePath = altBase;
        }

        let apiVersion = this.apiVersion;
        if (altApiVersion) {
            apiVersion = altApiVersion;
        }

        pathname = basePath + apiVersion + pathname;

        const fullPAth = `${this.protocol}://${this.host}:${this.port}/${pathname}`;

        return decodeURIComponent(fullPAth);
    }

    private doRequest(options) {
        if (this.oauth && this.oauth.consumer_key && this.oauth.consumer_secret) {
            options.oauth = {
                consumer_key: this.oauth.consumer_key,
                consumer_secret: this.oauth.consumer_secret,
                token: this.oauth.access_token,
                token_secret: this.oauth.access_token_secret,
            };
        } else if (this.username && this.password) {
            options.auth = {
                username: this.username,
                password: this.password,
            };
        }

        options.headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
            'Host': this.host,
        };

        return axios.request(options);
    }

    findIssue(issueNumber) {
        const options = {
            url: this.makeUri('/issue/' + issueNumber),
            method: 'GET',
        };

        return this.doRequest(options);
    }

    transitionIssue(issueNum, issueTransition) {
        const options = {
            url: this.makeUri('/issue/' + issueNum + '/transitions'),
            data: issueTransition,
            method: 'POST',
            json: true,
            withCredentials: true,
        };

        return this.doRequest(options);
    }
}
