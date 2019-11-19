import { OAReportService } from './index.service';
import { Request, Response } from 'express';
export declare class OAReportController {
    private readonly oAReportService;
    constructor(oAReportService: OAReportService);
    OaReportHTML(res: Response, req: Request, cookie: string): Promise<object>;
}
