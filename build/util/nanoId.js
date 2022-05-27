"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const nanoIdGenerator = () => {
    const nanoid = (0, nanoid_1.customAlphabet)("1234567890", 10);
    return nanoid(); //=> "4901342456"
    console.log(nanoid());
};
exports.default = nanoIdGenerator;
