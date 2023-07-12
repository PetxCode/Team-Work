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
exports.OfficeEntity = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const UserEntity_1 = require("./UserEntity");
const AssignRoleEntity_1 = require("./AssignRoleEntity");
let OfficeEntity = class OfficeEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", Object)
], OfficeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OfficeEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity_1.UserEntity, (role) => role.office),
    __metadata("design:type", UserEntity_1.UserEntity)
], OfficeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AssignRoleEntity_1.AssignRoleEntity, (role) => role.office),
    __metadata("design:type", Array)
], OfficeEntity.prototype, "role", void 0);
OfficeEntity = __decorate([
    (0, typeorm_1.Entity)("OfficeEntity")
], OfficeEntity);
exports.OfficeEntity = OfficeEntity;
//# sourceMappingURL=OfficeEntity.js.map