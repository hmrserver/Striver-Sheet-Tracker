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

export function questionStatsLeetcode(session, question) {
  // console.log("Fetching stats for question: " + question);
  // console.log(process.env.REACT_APP_BACKEND_PROXY);
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
      // console.log(res.data.question);
      return res.data.question;
    });
}

export function questionStatsCodingninjas(token, qid) {
  // console.log("Fetching stats for question: " + qid);
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
          return {
            avg_time_to_solve: final.data.problem_list[0].avg_time_to_solve,
            status: final.data.problem_list[0].submission_status,
            company: final.data.problem_list[0].company_list,
            difficulty: final.data.problem_list[0].difficulty,
            is_upvoted: final.data.problem_list[0].is_upvoted,
          };
        });
    });
}
