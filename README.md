# What's that?

It's a simple REST service, that works with yesno.wtf API

# Instruction to deploy

1. Open terminal
2. provide command to build docker image docker build -t simple-rest .
3. install aws cli
4. provide command aws configure
5. Enter access keys you created on aws site
6. provide command to log in aws cloud aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account_id>.dkr.ecr.us-east-1.amazonaws.com you can get account id in your account settings on aws site
7. provide command to tag your repository docker tag simple-rest:latest <account_id>.dkr.ecr.us-east-1.amazonaws.com/simple-rest:latest
8. provide command to push image to aws repository docker push <account_id>.dkr.ecr.us-east-1.amazonaws.com/simple-rest:latest
9. provide command aws apigateway create-rest-api --name "<API name>"
10. provide command aws apigateway create-resource --rest-api-id <api-id> --parent-id <parent-id> --path-part "random" all ids you can get in jsons you get as output of previous commands, this command creates endpoint
11. aws apigateway put-method --rest-api-id <api-id> --resource-id <id-of resource you created earlier> --http-method GET --authorization-type NONE - it creates method for our endpoint
12. aws lambda create-function --function-name <Lambda function name> --runtime nodejs14.x --role arn:aws:iam::<id of account>:role/lambda-role --handler index.handler --zip-file fileb://lambda-package.zip - here is tricky deals, to run this command you must make some other things
     * create zip file for deployment i just created zip archive with my project
     * then run command aws iam create-role --role-name <permission name> --assume-role-policy-document file://trust-policy.json - it creates permission for creating and running lambda and takes it all from json file you had to create earlier
     * then run command aws iam attach-role-policy --role-name <permission name you provided earlier> --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
13. finally we have all for deploy and first we have to integrate our get request method on "/random" endpoint with lambda function 
14. run command aws apigateway put-integration --rest-api-id <api id> --resource-id <endpoint id> --http-method GET --type AWS_PROXY --integration-http-method POST --uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:<acc-id>:function:MyLambdaFunction/invocations
15. and finally aws apigateway create-deployment --rest-api-id <api id> --stage-name <any name, I called prod>


And finally we can enjoy my beautiful rest api https://xx4hmh90h0.execute-api.eu-north-1.amazonaws.com/prod/, that demands authorization, but finally it exists and works

