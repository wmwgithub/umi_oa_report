"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log(path_1.join(__dirname, './OAReport/dist'));
    app.useStaticAssets(path_1.join(__dirname, '..', './public/OAReport/dist'), {
        prefix: '/oa/report',
    });
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'views/OAReport'));
    app.setViewEngine('hbs');
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map