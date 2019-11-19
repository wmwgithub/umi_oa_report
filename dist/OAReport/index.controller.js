"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const index_service_1 = require("./index.service");
const path_1 = require("path");
let OAReportController = class OAReportController {
    constructor(oAReportService) {
        this.oAReportService = oAReportService;
    }
    async OaReportHTML(res, req, cookie) {
        console.log(cookie);
        !cookie && res.render('err.hbs');
        let user = await this.oAReportService.userInfo(cookie);
        if (user['code'] !== 2000) {
            res.send('解析错误');
            return user;
        }
        global['window'] = {};
        const serverRender = require(path_1.join(__dirname, '../../public/OAReport/dist/umi.server.js'));
        const { ReactDOMServer } = serverRender;
        let { rootContainer, htmlElement, matchPath, g_initialData, } = await serverRender.default(res);
        g_initialData = Object.assign(Object.assign({}, g_initialData), { user: user['data'], cookie: cookie });
        console.log(encodeURIComponent(JSON.stringify(g_initialData)));
        let ssrHtml = ReactDOMServer.renderToString(htmlElement);
        res.render("index.hbs", {
            JSPath: './oa/report/umi.js',
            CSSPath: './oa/report/umi.css',
            g_initialData: encodeURIComponent(JSON.stringify(g_initialData))
        });
        return;
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Req()), __param(2, common_1.Query('cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], OAReportController.prototype, "OaReportHTML", null);
OAReportController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [index_service_1.OAReportService])
], OAReportController);
exports.OAReportController = OAReportController;
//# sourceMappingURL=index.controller.js.map