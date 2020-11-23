#!/usr/bin/env python
import random
from twython import Twython
from ssm_secrets import get_secret

# Create the Twython Twitter client using the credentials stored in SSM
# Steps to follow to get oauth tokens: https://twython.readthedocs.io/en/latest/usage/starting_out.html#oauth-1-user-authentication

# twitter = Twython(
#     app_key=get_secret("CONSUMER_KEY"),
#     app_secret=get_secret("CONSUMER_SECRET")
# )

# auth = twitter.get_authentication_tokens()

# twitter = Twython(
#     app_key=get_secret("CONSUMER_KEY"),
#     app_secret=get_secret("CONSUMER_SECRET"),
#     oauth_token=auth['oauth_token'],
#     oauth_token_secret=auth['oauth_token_secret']
# )

# final_step = twitter.get_authorized_tokens("<pin number>")

# OAUTH_TOKEN = final_step['oauth_token']
# OAUTH_TOKEN_SECRET = final_step['oauth_token_secret']

twitter = Twython(
    app_key=get_secret("CONSUMER_KEY"),
    app_secret=get_secret("CONSUMER_SECRET"),
    oauth_token=get_secret("OAUTH_TOKEN"),
    oauth_token_secret=get_secret("OAUTH_TOKEN_SECRET")
)

# Sample random tweets
potential_tweets = [
    'This is my first tweet with Sparrow by @fmc_sea - https://github.com/fernando-mc/sparrow',
    'Wow! Isn\'t Sparrow by @fmc_sea just the coolest! https://github.com/fernando-mc/sparrow',
    'Jeez! Everyone should learn about AWS Lambda and Twitter Bots from @fmc_sea'
]


def send_tweet(tweet_text):
    """Sends a tweet to Twitter"""
    twitter.update_status(status=tweet_text)


def handler(event, context):
    """Sends random tweet from list of potential tweets"""
    send_tweet(random.choice(potential_tweets))


def follow_someone(screen_name):
    twitter.create_friendship(screen_name=screen_name)


def follow_joeratt():
    follow_someone("joeratt")


def like_tweet(tweet_id):
    twitter.create_favorite(id=tweet_id)


def like_a_punny_tweet():
    like_tweet("1316749131470245889")
