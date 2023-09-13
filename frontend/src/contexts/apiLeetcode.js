// export function questionStats(session, question) {
//   console.log("Fetching stats for question: " + question);
//   const payload = {
//     operationName: "questionData",
//     variables: { titleSlug: question },
//     query:
//       "query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    title\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n    categoryTitle\n    topicTags {\n      name\n    }\n    companyTagStats\n    stats\n    status\n  }\n}\n",
//   };
//   return fetch("https://leetcode.com/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Cookie: "LEETCODE_SESSION=" + session,
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       return res.data.question;
//     });
// }

// Function to get cached data
export function getCacheData(key) {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    if (parsedData.expiry > Date.now()) {
      return parsedData.data;
    }
  }
  return null;
}

// Function to set cache data
export function setCacheData(key, data) {
  const CACHE_EXPIRY_TIME_MS = 86400000; // Set your desired cache expiry time
  const dataToCache = {
    data,
    expiry: Date.now() + CACHE_EXPIRY_TIME_MS,
  };
  localStorage.setItem(key, JSON.stringify(dataToCache));
}

// Function to check if status is "ac" or "COMPLETED"
export function shouldFetchData(data) {
  return !data || (data.status !== "ac" && data.status !== "COMPLETED");
}

// fetch conditionally
export function questionStatsLeetcode(session, question) {
  const CACHE_KEY = `leetcode_${question}`;

  // If cache is not present, expired, or status is not "ac" or "COMPLETED", fetch data
  const payload = question;
  return fetch(
    process.env.REACT_APP_BACKEND_PROXY +
      "/leet_back_proxy/" +
      session +
      "/" +
      payload
  )
    .then((res) => res.json())
    .then((res) => {
      const data = res.data.question;

      // Cache the data if status is not "ac" or "COMPLETED"
      setCacheData(CACHE_KEY, data);

      return data;
    });
}

export function questionStatsCodingninjas(token, qid) {
  const CACHE_KEY = `codingninjas_${qid}`;

  // If cache is not present, expired, or status is not "ac" or "COMPLETED", fetch data
  const payload = qid;
  return fetch(
    `https://api.codingninjas.com/api/v3/public_section/problem_detail?slug=${qid}&list_slug=striver-sde-sheet-problems`,
    {
      headers: {
        authorization: `Token ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((jsondata) => {
      if (jsondata.data === null) return {};

      return fetch(
        `https://api.codingninjas.com/api/v3/public_section/all_problems?count=1&page=1&search=${jsondata.data.offerable.problem.name}`,
        {
          headers: {
            authorization: `Token ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((final) => {
          const data = {
            avg_time_to_solve: final.data.problem_list[0].avg_time_to_solve,
            status: final.data.problem_list[0].submission_status,
            company: final.data.problem_list[0].company_list,
            difficulty: final.data.problem_list[0].difficulty,
            is_upvoted: final.data.problem_list[0].is_upvoted,
          };

          // Cache the data if status is not "ac" or "COMPLETED"
          setCacheData(CACHE_KEY, data);

          return data;
        });
    });
}
