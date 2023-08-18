const url: string = "https://jsonplaceholder.typicode.com/posts";
const urlUsers: string = "https://dummyjson.com/users";

const postsContainer: HTMLElement | null = document.querySelector("#posts-container");

const postPage: HTMLElement | null = document.querySelector("#post");
const postContainer: HTMLElement | null = document.querySelector("#post-container");
const userContainer: HTMLElement | null = document.querySelector("#user-container");
const socialMediaContainer: HTMLElement | null = document.querySelector("#social-media-container");
const commentsContainer: HTMLElement | null = document.querySelector("#comments-container");

const commentForm: HTMLFormElement | null = document.querySelector("#comment-form");
const emailInput: HTMLInputElement | null = document.querySelector("#email");
const bodyInput: HTMLInputElement | null = document.querySelector("#body");

// Get id from URL
const urlSearchParams: URLSearchParams = new URLSearchParams(window.location.search);
const postId: string | null = urlSearchParams.get("id");

// Get all articles
async function getAllPosts(): Promise<void> {
    const response: Response = await fetch(url);
    const data: any[] = await response.json();

    data.map((post: any) => {
        const div: HTMLDivElement = document.createElement("div");
        const title: HTMLHeadingElement = document.createElement("h4");
        const img: HTMLImageElement = document.createElement("img");

        div.classList.add("resume-post");
        title.innerText = post.title;
        img.setAttribute("src", `https://picsum.photos/id/${post.id}/250/200`);

        div.setAttribute("onclick", `openPost(${post.id})`);
        div.appendChild(img);
        div.appendChild(title);

        postsContainer?.appendChild(div);
    });
}

function openPost(postId: number): void {
    window.location.href = `/post.html?id=${postId}`;
}

// Get individual article
async function getPost(id: number): Promise<void> {
    const [responsePost, responseComments, responseUsers] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`),
        fetch(`${urlUsers}/${id}`)
    ]);

    const dataPost: any = await responsePost.json();
    const dataComments: any[] = await responseComments.json();
    const dataUsers: any = await responseUsers.json();

    const title: HTMLHeadingElement = document.createElement("h1");
    const postImg: HTMLImageElement = document.createElement("img");
    const body: HTMLParagraphElement = document.createElement("p");
    const author: HTMLParagraphElement = document.createElement("p");
    const authorPic: HTMLImageElement = document.createElement("img");
    const facebook: HTMLImageElement = document.createElement("img");
    const twitter: HTMLImageElement = document.createElement("img");

    title.innerText = dataPost.title;
    postImg.setAttribute("src", `https://picsum.photos/id/${dataPost.id}/900/400`);
    body.innerText = dataPost.body;
    author.innerText = `${dataUsers.lastName}, ${dataUsers.firstName}`;
    authorPic.setAttribute("src", `${dataUsers.image}`);
    facebook.setAttribute("src", "https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/facebook_online_social_media-512.png");
    twitter.setAttribute("src", "https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/online_social_media_twitter-512.png");
    facebook.setAttribute("onclick", `openFacebook(${dataUsers.id})`);
    twitter.setAttribute("onclick", `openTwitter(${dataUsers.id})`);

    postContainer?.appendChild(title);
    postContainer?.appendChild(postImg);
    postContainer?.appendChild(body);
    socialMediaContainer?.appendChild(twitter);
    socialMediaContainer?.appendChild(facebook);
    userContainer?.appendChild(author);
    userContainer?.appendChild(authorPic);

    dataComments.map((comment: any) => {
        createComment(comment);
    });
}

function openFacebook(userId: number): void {
    window.open(`https://facebook.com/${userId}`, "_blank");
}

function openTwitter(userId: number): void {
    window.open(`https://twitter.com/${userId}`, "_blank");
}

function createComment(comment: any): void {
    const div: HTMLDivElement = document.createElement("div");
    const email: HTMLHeadingElement = document.createElement("h4");
    const commentBody: HTMLParagraphElement = document.createElement("p");

    email.innerText = comment.email;
    commentBody.innerText = comment.body;

    div.appendChild(email);
    div.appendChild(commentBody);

    commentsContainer?.appendChild(div);
}

async function postComment(comment: string): Promise<void> {
    const response: Response = await fetch(`${url}/${postId}/comments`, {
        method: "POST",
        body: comment,
        headers: {
            "Content-type": "application/json",
        },
    });

    const data: any = await response.json();
    createComment(data);
}

if (!postId) {
    getAllPosts();
} else {
    getPost(Number(postId));

    if (commentForm) {
        commentForm.addEventListener("submit", (e: Event) => {
            e.preventDefault();

            let comment: any = {
                email: emailInput?.value,
                body: bodyInput?.value,
            };

            comment = JSON.stringify(comment);

            postComment(comment);
        });
    }
}