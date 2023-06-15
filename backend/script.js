const { default: axios, isAxiosError } = require("axios");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const BASE_URL = "http://127.0.0.1:9000";
const REGISTER_URL = "/api/users/register";
const LOGIN_URL = "/api/users/login";
const POST_URL = "/api/post";
const PROFILE_URL = "/api/profile";
const COMMENT_URL = "/api/post/comment";
const TEST_PASSWORD = "12345678";

const DUMMY_JSON_URL = "https://dummyjson.com";
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
const instance = axios.create({
  BASE_URL,
  withCredentials: true,
});
function externalAPIcalls() {
  async function fetchData(data) {
    try {
      const { data: resData } = await axios.get(DUMMY_JSON_URL + "/" + data);
      return resData;
    } catch (error) {
      console.log("Error in fetching users");
    }
  }
  const factory = {
    users: fetchData("users"),
    comments: fetchData("comments"),
    posts: fetchData("posts"),
  };
  return Object.freeze(factory);
}

async function userAPICalls() {
  const factory = externalAPIcalls();
  const users = await factory.users.then((res) => res.users);
  async function registerUsers() {
    try {
      const requests = users.map(generateUserAPICall);
      await Promise.all(requests);
      console.log("users registered ", requests.length);
    } catch (error) {
      console.log(error);
    }
  }
  function generateUserAPICall(user) {
    const name = `${user.firstName} ${user.maidenName}  ${user.lastName}`;
    const email = user.email;
    const password = TEST_PASSWORD;
    const avatar = user.image;
    return axios.post(BASE_URL + REGISTER_URL, {
      name,
      avatar,
      email,
      password,
    });
  }

  async function getLoginCookie(email, password) {
    if (
      ((typeof email !== "string" || typeof password !== "string") &&
        email.length <= 0) ||
      password.length <= 0
    ) {
      return;
    }
    try {
      const response = await instance.post(BASE_URL + LOGIN_URL, {
        email,
        password,
      });
      const cookie = response.headers["set-cookie"];
      return cookie;
    } catch (error) {
      console.log(error.response.data);
    }
  }
  async function fetchCookiesForUsers() {
    try {
      const cookiesRequests = users.map((user) =>
        getLoginCookie(user.email, TEST_PASSWORD)
      );
      const responsesCookies = await Promise.allSettled(cookiesRequests);
      const cookies = responsesCookies.map((response) =>
        response.status === "fulfilled" ? response.value : null
      );
      return cookies;
    } catch (error) {
      console.log(error.response.data);
    }
  }
  return Object.freeze({ registerUsers, getLoginCookie, fetchCookiesForUsers });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
async function postsAPICalls(cookies) {
  const factory = externalAPIcalls();
  let postIds = [];
  function getPost(post) {
    const { title, body: text, tags } = post;
    return { title, text, tags };
  }
  function createPostApiInstance(Cookie, post) {
    return instance.post(BASE_URL + POST_URL, post, {
      headers: {
        Cookie,
      },
    });
  }
  async function createPosts() {
    const factoryPosts = await factory.posts.then((res) => res.posts);

    const requests = [];
    cookies.forEach((Cookie) => {
      let i = getRandomInt(factoryPosts.length),
        j = getRandomInt(factoryPosts.length);
      requests.push(createPostApiInstance(Cookie, getPost(factoryPosts[i])));
      requests.push(createPostApiInstance(Cookie, getPost(factoryPosts[j])));
    });
    const responses = await Promise.allSettled(requests);
    console.log("posts created ", responses.length);
    postIds = responses.map((res) => res.value.data.post._id);
  }
  async function createCommentApiInstance(postId, Cookie, text) {
    return instance.post(
      BASE_URL + COMMENT_URL,
      {
        postId,
        text,
      },
      {
        headers: {
          Cookie,
        },
      }
    );
  }
  async function commentOnPosts() {
    try {
      const commentsFetched = await factory.comments;
      const comments = commentsFetched.comments.map((comment) => comment.body);
      const requests = [];
      postIds.forEach((postId) => {
        let i = getRandomInt(cookies.length),
          j = getRandomInt(cookies.length);
        const Cookie1 = cookies[i],
          Cookie2 = cookies[j];
        requests.push(
          createCommentApiInstance(
            postId,
            Cookie2,
            comments[getRandomInt(comments.length)]
          )
        );
        requests.push(
          createCommentApiInstance(
            postId,
            Cookie1,
            comments[getRandomInt(comments.length)]
          )
        );
      });
      const responses = await Promise.allSettled(requests);
      const filtered = responses
        .filter(Boolean)
        .map((response) => response.value);
      console.log("comments done ", filtered.length);
    } catch (error) {
      throw error;
    }
  }
  return Object.freeze({ createPosts, commentOnPosts });
}

const generateProfileRequest = (Cookie) => {
  const skills = [
    {
      skill: lorem.generateWords(1),
      yearsWorked: getRandomInt(5),
    },
    {
      skill: lorem.generateWords(1),
      yearsWorked: getRandomInt(5),
    },
  ];
  const handle = [
    {
      username: lorem.generateWords(1),
      link: lorem.generateWords(1),
      platform: "Google",
    },
  ];
  const status = lorem.generateWords(6);
  const experience = [
    {
      title: lorem.generateWords(2),
      company: lorem.generateWords(2),
      description: lorem.generateSentences(2),
    },
  ];
  const education = [
    {
      degree: lorem.generateWords(1),
      area: lorem.generateWords(1),
      school: lorem.generateWords(3),
      description: lorem.generateSentences(2),
    },
  ];
  const profile = { skills, education, experience, status, handle };
  const request = instance.post(BASE_URL + PROFILE_URL, profile, {
    headers: {
      Cookie,
    },
  });
  return request;
};
function profileAPICalls(fetchedCookies) {
  async function createProfiles() {
    const requests = fetchedCookies.map(generateProfileRequest);
    const responses = await Promise.allSettled(requests);
    console.log("profiles created ", responses.length);
  }
  return Object.freeze({ createProfiles });
}

(async () => {
  const { registerUsers, fetchCookiesForUsers } = await userAPICalls();
  await registerUsers();
  const cookies = await fetchCookiesForUsers();
  const { commentOnPosts, createPosts } = await postsAPICalls(cookies);
  await createPosts();
  await commentOnPosts();
  const { createProfiles } = profileAPICalls(cookies);
  await createProfiles();
})();
