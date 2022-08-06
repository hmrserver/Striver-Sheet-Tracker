import http.client
import json

from requests import head

def api_call(sessionId, data=None):
    conn = http.client.HTTPSConnection("leetcode.com")
    headersList = {
     "Accept": "*/*",
     "Cookie": f"LEETCODE_SESSION={sessionId};",
     "Content-Type": "application/json" 
    }
    print(headersList)

    payload = json.dumps({"operationName":"questionData","variables":{"titleSlug":data},"query":"query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    title\n    difficulty\n    isLiked\n    categoryTitle\n    topicTags {\n      name\n    }\n    stats\n    status\n  }\n}\n"})


    conn.request("POST", "/graphql", payload, headersList)
    response = conn.getresponse()
    result = response.read()
    return result.decode("utf-8")


from flask import Flask, request
app = Flask(__name__)
@app.route('/')
def index():
    return '<h1>Hello World!</h1>'

@app.route('/leet_back_proxy/<sessionId>/<data>', methods=['GET'])
def post_json(sessionId,data):
    result = api_call(sessionId, data)
    return result, 200,{'Access-Control-Allow-Origin': '*'}


if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=process.env.PORT)
