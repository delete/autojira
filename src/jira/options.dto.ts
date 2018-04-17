export default interface Options {
    protocol?: string;
    host: string;
    port?: number;
    username: string;
    password: string;
    apiVersion?: string;
    verbose?: boolean;
    strictSSL?: boolean;
    oauth?: any;
}