import requests
import json
import jsonpath

# Set your magento installation base url and access token

url = "http://magento.jsmartfix.com/rest/all/V1/directory/countries"
token = "s8ohb34lwfdv2743tex3kl4ot8wj88x8"

headers = {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization" : 'Bearer '+ token
}


# country list with the location and id
def test_CountryList():
    response = requests.get(url,headers=headers)
    response_json = json.loads(response.text)
    for index in range(len(response_json)):
        id = response_json[index]['id']
        location = response_json[index]['full_name_locale']
        print('Country Id = ', id, '   Country Location = ', location)
    assert response.status_code == 200


if __name__ == "__main__":
    test_CountryList()
    
# run pytest through
# pytest TestCases