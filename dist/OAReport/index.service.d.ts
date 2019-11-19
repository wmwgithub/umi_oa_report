import 'isomorphic-fetch';
export declare class OAReportService {
    getHello(): Promise<string>;
    userInfo(cookie: string): Promise<object>;
}
