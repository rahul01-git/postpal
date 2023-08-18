"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = exports.Comment = exports.Like = exports.Post = exports.User = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var post_1 = require("./post");
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return __importDefault(post_1).default; } });
var like_1 = require("./like");
Object.defineProperty(exports, "Like", { enumerable: true, get: function () { return __importDefault(like_1).default; } });
var comment_1 = require("./comment");
Object.defineProperty(exports, "Comment", { enumerable: true, get: function () { return __importDefault(comment_1).default; } });
var reply_1 = require("./reply");
Object.defineProperty(exports, "Reply", { enumerable: true, get: function () { return __importDefault(reply_1).default; } });
