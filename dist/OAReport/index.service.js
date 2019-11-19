"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
require("isomorphic-fetch");
let OAReportService = class OAReportService {
    async getHello() {
        return 'Hello OAreport!';
    }
    async userInfo(cookie) {
        console.log(cookie);
        let res = await fetch('http://v2.oa.lemonlife.top/api/getUserByStuid', {
            headers: {
                'cookie': cookie
            },
            method: "get"
        }).then((res) => res.json())
            .then(res => res);
        console.log(res);
        return {
            code: res.code,
            data: {
                id: res.data[0]['id'],
                stuid: res.data[0]['stuid'],
                depart: res.data[0]['depart'],
                role: res.data[0]['role'],
                status: res.data[0]['status'],
                campus: res.data[0]['campus']
            }
        };
    }
};
OAReportService = __decorate([
    common_1.Injectable()
], OAReportService);
exports.OAReportService = OAReportService;
//# sourceMappingURL=index.service.js.map