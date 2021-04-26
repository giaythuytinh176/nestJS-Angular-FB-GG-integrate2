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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const joi_1 = require("joi");
class tokenDTO {
}
__decorate([
    swagger_1.ApiProperty({
        type: joi_1.string,
        example: 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDdlNTk3MmYyOTQ5ZTIxOTQwNTNhYWEiLCJpYXQiOjE2MTg4OTMxNzAsImV4cCI6MTYxOTA2NTk3MH0.vdTRSPkOzi_upMF7QPkThV7Lgdt6IG4641WMB0LLW3k',
        description: 'The access tokens to authenticate',
    }),
    __metadata("design:type", String)
], tokenDTO.prototype, "token", void 0);
exports.tokenDTO = tokenDTO;
//# sourceMappingURL=token.dto.js.map