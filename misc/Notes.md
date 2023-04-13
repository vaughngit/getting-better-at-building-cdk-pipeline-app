# Source: 
##    DOP401 - Get better at building AWS CDK constructs
        https://catalog.us-east-1.prod.workshops.aws/workshops/5cd379cf-93b3-47be-8107-466fa7b28728/en-US/l3-constructs

## Testing:

cdk synth --app='./lib/integ.test.default.js'
cdk deploy --app='./lib/integ.test.default.js'
cdk destroy --app='./lib/integ.test.default.js'

## Login via cli

aws sso login --no-browser 