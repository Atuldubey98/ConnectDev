const { default: axios, isAxiosError } = require("axios");
const baseUrl = "http://localhost:9000";

const instance = axios.create({
  baseUrl,
  withCredentials: true,
});

async function fetchData(data) {
  try {
    const { data: resData } = await axios.get(`https://dummyjson.com/${data}`);
    return resData;
  } catch (error) {
    console.log("Error in fetching users");
  }
}

const register = "/api/users/register";
const login = "/api/users/login";
async function registerUsers() {
  try {
    const users = await fetchData("users").then((res) => res.users);
    const requests = await users.map((user) => {
      const name = `${user.firstName} ${user.maidenName}  ${user.lastName}`;
      const email = user.email;
      const password = user.password;
      const avatar = user.image;
      return axios.post(register, {
        name,
        avatar,
        email,
        password,
      });
    });
    const responses = await Promise.allSettled(requests);
    const created = responses.map(
      (response) => response.status === "fulfilled"
    );
    console.log(created.length + " users created");
  } catch (error) {
    console.log(error);
  }
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
    const response = await instance.post(
      "http://localhost:9000/api/users/login",
      {
        email,
        password,
      }
    );
    const cookie = response.headers["set-cookie"];
    return cookie;
  } catch (error) {
    console.log(error);
  }
}
async function fetchCookiesForUsers() {
  try {
    const users = await fetchData("users").then((res) => res.users);
    const cookiesRequests = users.map((user) =>
      getLoginCookie(user.email, user.password)
    );
    const responsesCookies = await Promise.allSettled(cookiesRequests);
    const cookies = responsesCookies.map((response) =>
      response.status === "fulfilled" ? response.value : null
    );
    return cookies;
  } catch (error) {
    throw error;
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
async function createPosts() {
  const cookies = await fetchCookiesForUsers();
  const posts = await fetchData("posts").then((res) => res.posts);

  const requests = [];
  cookies.forEach((Cookie) => {
    let i = getRandomInt(posts.length),
      j = getRandomInt(posts.length);
    const { title: title1, body: text1, tags: tags1 } = posts[i];
    const { title: title2, body: text2, tags: tags2 } = posts[j];
    console.log(i, j);
    requests.push(
      instance.post(
        "http://localhost:9000/api/post",
        {
          title: title1,
          text: text1,
          tags: tags1,
        },
        {
          headers: {
            Cookie,
          },
        }
      )
    );
    requests.push(
      instance.post(
        "http://localhost:9000/api/post",
        {
          title: title2,
          text: text2,
          tags: tags2,
        },
        {
          headers: {
            Cookie,
          },
        }
      )
    );
  });
  await Promise.allSettled(requests);
}
async function commentOnPosts() {
  try {
    const cookies = await fetchCookiesForUsers();
    const commentsFetched = await fetchData("comments");
    const comments = commentsFetched.comments.map((comment) => comment.body);
    const Cookie =
      Array.isArray(cookies) && cookies.length > 0 ? cookies[0] : null;
    const { data } = await instance.get("http://localhost:9000/api/post/all", {
      headers: {
        Cookie,
      },
    });
    const { posts } = data;
    const postIds = Array.isArray(posts) ? posts.map((post) => post._id) : [];
    const requests = [];
    postIds.forEach((postId) => {
      let i = getRandomInt(cookies.length),
        j = getRandomInt(cookies.length);
      const Cookie1 = cookies[i],
        Cookie2 = cookies[j];
      requests.push(
        instance.post(
          "http://localhost:9000/api/post/comment",
          {
            postId,
            text: comments[getRandomInt(comments.length)],
          },
          {
            headers: {
              Cookie: Cookie1,
            },
          }
        )
      );
      requests.push(
        instance.post(
          "http://localhost:9000/api/post/comment",
          {
            postId,
            text: comments[getRandomInt(comments.length)],
          },
          {
            headers: {
              Cookie: Cookie2,
            },
          }
        )
      );
    });
    const responses = await Promise.allSettled(requests);
    const filtered = responses
      .filter(Boolean)
      .map((response) => response.value);
    console.log(filtered.length + "Comments");
  } catch (error) {
    throw error;
  }
}
