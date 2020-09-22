#!/bin/bash
aws sts assume-role --output json --role-arn arn:aws:iam::908568066669:role/serverless_deploy_role --role-session-name assume-transitive > cred.json
export AWS_ACCESS_KEY_ID=$(cat cred.json| jq .Credentials.AccessKeyId | xargs)
export AWS_SECRET_ACCESS_KEY=$(cat cred.json| jq .Credentials.SecretAccessKey| xargs)
export AWS_SESSION_TOKEN=$(cat cred.json| jq .Credentials.SessionToken| xargs)
export AWS_EXPIRATION=$(cat cred.json| jq .Credentials.Expiration| xargs)
rm -f cred.json
#echo "check sts role's access from script"
sls create_domain
#echo "tried create domain"
npm run deploy
