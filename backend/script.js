const { default: axios, isAxiosError } = require("axios");
const baseUrl = "http://localhost:8080";

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
      "http://localhost:8080/api/users/login",
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
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

(async () => {
  const users = await fetchData("users").then((res) => res.users);
  const posts = await fetchData("posts").then((res) => res.posts);
  const cookiesRequests = users.map((user) =>
    getLoginCookie(user.email, user.password)
  );
  const responsesCookies = await Promise.allSettled(cookiesRequests);
  const cookies = responsesCookies.map((response) =>
    response.status === "fulfilled" ? response.value : null
  );
  const requests = [];
  cookies.forEach((Cookie) => {
    let i = getRandomInt(posts.length),
      j = getRandomInt(posts.length);
    const { title: title1, body: text1, tags: tags1 } = posts[i];
    const { title: title2, body: text2, tags: tags2 } = posts[j];
    console.log(i, j);
    requests.push(
      instance.post(
        "http://localhost:8080/api/post",
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
        "http://localhost:8080/api/post",
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
})();
