// url of APIs
const url: string = "https://jsonplaceholder.typicode.com/posts";
const urlUsers: string = "https://dummyjson.com/users";

//Elements of initial page
const postsContainer: HTMLElement | null = document.querySelector("#posts-container");
const paginationContainer: HTMLElement | null = document.querySelector("#pagination-container");

//Elements of pagination
const postsPerPage = 6;
let currentPage = 1;

//Elements of individual post page
const postPage: HTMLElement | null = document.querySelector("#post");
const postContainer: HTMLElement | null = document.querySelector("#post-container");
const userContainer: HTMLElement | null = document.querySelector("#user-container");
const socialMediaContainer: HTMLElement | null = document.querySelector("#social-media-container");
const commentsContainer: HTMLElement | null = document.querySelector("#comments-container");

//Elements of comments on the post page
const commentForm: HTMLFormElement | null = document.querySelector("#comment-form");
const emailInput: HTMLInputElement | null = document.querySelector("#email");
const bodyInput: HTMLInputElement | null = document.querySelector("#body");

//Elements of responsiviness
const mobileMenu: HTMLElement | null = document.querySelector(".mobile-menu");
const nav: HTMLElement | null = document.querySelector(".nav");
if (mobileMenu && nav) {
    mobileMenu.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

const mainTitle: HTMLElement | null = document.querySelector("#main-title");

// Get id from URL
const urlSearchParams: URLSearchParams = new URLSearchParams(window.location.search);
const postId: string | null = urlSearchParams.get("id");

// Get all articles
async function getAllPosts(): Promise<void> {
    // Get informations from the API
    const response: Response = await fetch(url);
    const data: any[] = await response.json();

    // Use element of the pagination for define the posts of the actual page
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    //Clears the information of the past page
    if(postsContainer !== null)
        postsContainer.innerHTML = '';
    
    //Update the page with your respective posts
    data.slice(startIndex, endIndex).map((post: any) => {
        //Assigns the HTML elements to the variables
        const div: HTMLDivElement = document.createElement("div");
        const title: HTMLHeadingElement = document.createElement("h4");
        const img: HTMLImageElement = document.createElement("img");

        //Assigns the variables with datas to the variables of HTML elements
        div.classList.add("resume-post");
        title.innerText = post.title;
        img.setAttribute("src", `https://picsum.photos/id/${post.id}/250/200`);

        //Add the informations of post to the div
        div.setAttribute("onclick", `openPost(${post.id})`);
        div.appendChild(img);
        div.appendChild(title);

        //Add the post on the page
        postsContainer?.appendChild(div);
    });

    //Update the pagination buttons of the page with your respective number
    updatePagination(data.length);
}

//Add buttons for pagination
function updatePagination(totalPosts: number): void {
    //Define the total of pages
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    //Clears the information of buttons of the past page
    if(paginationContainer !== null)
    paginationContainer.innerHTML = '';

    //Add the button of previous page
    const prevButton = createPageButton("Previous", currentPage > 1 ? currentPage - 1 : null);
    prevButton.classList.add("prev-button");
    paginationContainer?.appendChild(prevButton);

    //Define the visibility of the button based on the actual page
    if (currentPage == 1){
        prevButton.classList.add("hidden")
    }

    // Add the button with the number of actual page
    const currentPageLink = createPageButton(currentPage.toString(), null);
    currentPageLink.classList.add("current-page");
    paginationContainer?.appendChild(currentPageLink);

    // Add the button of next page
    const nextButton = createPageButton("Next", currentPage < totalPages ? currentPage + 1 : null);
    nextButton.classList.add("next-button");
    paginationContainer?.appendChild(nextButton);

    //Define the visibility of the button based on the actual page
    if(currentPage == totalPages){
        nextButton.classList.add("hidden")
    } 
    
}

//Create button for container of the pagination
function createPageButton(definition: string, targetPage: number | null): HTMLSpanElement {
    const pageButton = document.createElement("span");
    pageButton.innerText = definition;
    pageButton.classList.add("page-link");

    //Determines if the button will be active or not based on the actual page
    if (targetPage === null) {
        pageButton.classList.add("disabled");
    } else {
        //Function to change the posts shown on the page by clicking the button
        pageButton.addEventListener("click", () => {
            //Assigns the number of the desire page to the variable currentPage
            currentPage = targetPage;
            getAllPosts();
        });
        //Function to change the view of the page for the top of the main section
        pageButton.addEventListener("click", ()=> {
            mainTitle?.scrollIntoView();
        })
    }

    return pageButton;
}

//Redirect to individual page of the post
function openPost(postId: number): void {
    window.location.href = `/post.html?id=${postId}`;
}

//Get individual post
async function getPost(id: number): Promise<void> {
    //Pick data about the chosed post
    const [responsePost, responseComments, responseUsers] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`),
        fetch(`${urlUsers}/${id}`)
    ]);

    //Assigns the data to the variables
    const dataPost: any = await responsePost.json();
    const dataComments: any[] = await responseComments.json();
    const dataUsers: any = await responseUsers.json();

    //Assigns the HTML elements to the variables
    const title: HTMLHeadingElement = document.createElement("h1");
    const postImg: HTMLImageElement = document.createElement("img");
    const body: HTMLParagraphElement = document.createElement("p");
    const author: HTMLParagraphElement = document.createElement("p");
    const authorPic: HTMLImageElement = document.createElement("img");
    const facebook: HTMLImageElement = document.createElement("img");
    const twitter: HTMLImageElement = document.createElement("img");

    //Assigns the variables with datas to the variables of HTML elements
    title.innerText = dataPost.title;
    postImg.setAttribute("src", `https://picsum.photos/id/${dataPost.id}/900/400`);
    body.innerText = dataPost.body;
    author.innerText = `${dataUsers.lastName}, ${dataUsers.firstName}`;
    authorPic.setAttribute("src", `${dataUsers.image}`);
    facebook.setAttribute("src", "https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/facebook_online_social_media-512.png");
    twitter.setAttribute("src", "https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/online_social_media_twitter-512.png");
    facebook.setAttribute("onclick", `openFacebook(${dataUsers.id})`);
    twitter.setAttribute("onclick", `openTwitter(${dataUsers.id})`);

    //Add the informations of post to the page
    postContainer?.appendChild(title);
    postContainer?.appendChild(postImg);
    postContainer?.appendChild(body);
    socialMediaContainer?.appendChild(twitter);
    socialMediaContainer?.appendChild(facebook);
    userContainer?.appendChild(author);
    userContainer?.appendChild(authorPic);

    //Add comments of the respective post in the page
    dataComments.map((comment: any) => {
        createComment(comment);
    });
}

//Create comments on the post
function createComment(comment: any): void {
    //Assigns the HTML elements to the variables
    const div: HTMLDivElement = document.createElement("div");
    const email: HTMLHeadingElement = document.createElement("h4");
    const commentBody: HTMLParagraphElement = document.createElement("p");

    //Assigns the information of the comment to the variables
    email.innerText = comment.email;
    commentBody.innerText = comment.body;

    //Add the informations of comment to the div
    div.classList.add("comment")
    div.appendChild(email);
    div.appendChild(commentBody);

    //Add the informations of comment to the page
    commentsContainer?.appendChild(div);
}

//Create your own comment on the post
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
//Redirect to social network of the author of the post
function openFacebook(userId: number): void {
    window.open(`https://facebook.com/${userId}`, "_blank");
}

function openTwitter(userId: number): void {
    window.open(`https://twitter.com/${userId}`, "_blank");
}


//Determines the function of the page
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

