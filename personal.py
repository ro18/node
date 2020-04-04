from ibm_watson import PersonalityInsightsV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from os.path import join, dirname
import json
import os.path

# import requests
 
# get = requests.get('http://yournodeserverIPorURL/getdata') # GET request
# data = get.json()
# # process this JSON data and do something with it
# print(data) 
 
# newdata = {"foo": "bar", "kaa":"pa"} # this is the new data you're going to send to the Node server
 
# # now immediately sending a post request with new data
# post = requests.post('http://yournodeserverIPorURL/postdata', json=newdata) # the POST request
# print(post.text)

authenticator = IAMAuthenticator('IXH7vQnk77jZ6HeQznP_x6VLws6DHaN1UfVeszQEHtd8')
personality_insights = PersonalityInsightsV3(
    version='2017-10-13',
    authenticator=authenticator
)

personality_insights.set_service_url('https://gateway-lon.watsonplatform.net/personality-insights/api')

with open(join(dirname(__file__), 't.txt')) as profile_json:
    profile = personality_insights.profile(
        profile_json.read(),
        'application/json',
        content_type='text/plain',
        consumption_preferences=True,
        raw_scores=False
    ).get_result()

# save_path = 'D:\react\back'

completeName = os.path.join('/react/back/result2.json')
with open(completeName, 'w') as fp:
    json.dump(profile, fp)


print(json.dumps(profile, indent=2))



