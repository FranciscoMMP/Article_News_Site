var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var url = "https://jsonplaceholder.typicode.com/posts";
var urlUsers = "https://dummyjson.com/users";
var postsContainer = document.querySelector("#posts-container");
var postPage = document.querySelector("#post");
var postContainer = document.querySelector("#post-container");
var userContainer = document.querySelector("#user-container");
var socialMediaContainer = document.querySelector("#social-media-container");
var commentsContainer = document.querySelector("#comments-container");
var commentForm = document.querySelector("#comment-form");
var emailInput = document.querySelector("#email");
var bodyInput = document.querySelector("#body");
// Get id from URL
var urlSearchParams = new URLSearchParams(window.location.search);
var postId = urlSearchParams.get("id");
// Get all articles
function getAllPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    data.map(function (post) {
                        var div = document.createElement("div");
                        var title = document.createElement("h4");
                        var img = document.createElement("img");
                        div.classList.add("resume-post");
                        title.innerText = post.title;
                        img.setAttribute("src", "https://picsum.photos/id/".concat(post.id, "/250/200"));
                        div.setAttribute("onclick", "openPost(".concat(post.id, ")"));
                        div.appendChild(img);
                        div.appendChild(title);
                        postsContainer === null || postsContainer === void 0 ? void 0 : postsContainer.appendChild(div);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function openPost(postId) {
    window.location.href = "/post.html?id=".concat(postId);
}
// Get individual article
function getPost(id) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, responsePost, responseComments, responseUsers, dataPost, dataComments, dataUsers, title, postImg, body, author, authorPic, facebook, twitter;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        fetch("".concat(url, "/").concat(id)),
                        fetch("".concat(url, "/").concat(id, "/comments")),
                        fetch("".concat(urlUsers, "/").concat(id))
                    ])];
                case 1:
                    _a = _b.sent(), responsePost = _a[0], responseComments = _a[1], responseUsers = _a[2];
                    return [4 /*yield*/, responsePost.json()];
                case 2:
                    dataPost = _b.sent();
                    return [4 /*yield*/, responseComments.json()];
                case 3:
                    dataComments = _b.sent();
                    return [4 /*yield*/, responseUsers.json()];
                case 4:
                    dataUsers = _b.sent();
                    title = document.createElement("h1");
                    postImg = document.createElement("img");
                    body = document.createElement("p");
                    author = document.createElement("p");
                    authorPic = document.createElement("img");
                    facebook = document.createElement("img");
                    twitter = document.createElement("img");
                    title.innerText = dataPost.title;
                    postImg.setAttribute("src", "https://picsum.photos/id/".concat(dataPost.id, "/900/400"));
                    body.innerText = dataPost.body;
                    author.innerText = "".concat(dataUsers.lastName, ", ").concat(dataUsers.firstName);
                    authorPic.setAttribute("src", "".concat(dataUsers.image));
                    facebook.setAttribute("src", "https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/facebook_online_social_media-512.png");
                    twitter.setAttribute("src", "https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/online_social_media_twitter-512.png");
                    facebook.setAttribute("onclick", "openFacebook(".concat(dataUsers.id, ")"));
                    twitter.setAttribute("onclick", "openTwitter(".concat(dataUsers.id, ")"));
                    postContainer === null || postContainer === void 0 ? void 0 : postContainer.appendChild(title);
                    postContainer === null || postContainer === void 0 ? void 0 : postContainer.appendChild(postImg);
                    postContainer === null || postContainer === void 0 ? void 0 : postContainer.appendChild(body);
                    socialMediaContainer === null || socialMediaContainer === void 0 ? void 0 : socialMediaContainer.appendChild(twitter);
                    socialMediaContainer === null || socialMediaContainer === void 0 ? void 0 : socialMediaContainer.appendChild(facebook);
                    userContainer === null || userContainer === void 0 ? void 0 : userContainer.appendChild(author);
                    userContainer === null || userContainer === void 0 ? void 0 : userContainer.appendChild(authorPic);
                    dataComments.map(function (comment) {
                        createComment(comment);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function openFacebook(userId) {
    window.open("https://facebook.com/".concat(userId), "_blank");
}
function openTwitter(userId) {
    window.open("https://twitter.com/".concat(userId), "_blank");
}
function createComment(comment) {
    var div = document.createElement("div");
    var email = document.createElement("h4");
    var commentBody = document.createElement("p");
    email.innerText = comment.email;
    commentBody.innerText = comment.body;
    div.appendChild(email);
    div.appendChild(commentBody);
    commentsContainer === null || commentsContainer === void 0 ? void 0 : commentsContainer.appendChild(div);
}
function postComment(comment) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(url, "/").concat(postId, "/comments"), {
                        method: "POST",
                        body: comment,
                        headers: {
                            "Content-type": "application/json",
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    createComment(data);
                    return [2 /*return*/];
            }
        });
    });
}
if (!postId) {
    getAllPosts();
}
else {
    getPost(Number(postId));
    if (commentForm) {
        commentForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var comment = {
                email: emailInput === null || emailInput === void 0 ? void 0 : emailInput.value,
                body: bodyInput === null || bodyInput === void 0 ? void 0 : bodyInput.value,
            };
            comment = JSON.stringify(comment);
            postComment(comment);
        });
    }
}
