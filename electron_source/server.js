"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Express
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});
const PORT = 8083;
app.get("/apitest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        console.log(`api테스트`);
        res.send(`api테스트2`);
    }
    catch (error) {
        console.error('Error with API call:', error);
        res.send("api에러테스트");
    }
}));
// 서버실행코드
// app.listen(PORT, () => {
//   console.log(`Server listening on HTTP port ${PORT}`);
// }); 
// 일렉트론에서 사용가능하도록 exports
exports.default = app;
