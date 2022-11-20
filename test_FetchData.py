import requests
import json
import jsonpath

url = "https://reqres.in/api/users?page=2"

def test_FetchData():
    response = requests.get(url)
    # print(response.headers)

    json_response = json.loads(response.text)

    pages = jsonpath.jsonpath(json_response, 'data')

    for index in range(len(pages)):
        id = pages[index][0]
        email = pages[index][1]
        print('Id = ', id, 'Email = ', email)
    assert response.status_code == 200

if __name__ == "__main__":
    test_FetchData()

#python -m pytest GET_Request