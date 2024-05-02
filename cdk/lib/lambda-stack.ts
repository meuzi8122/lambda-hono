import { App, Duration, Stack, StackProps } from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { AnyPrincipal, Effect, PolicyDocument, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class LambdaStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id);

        const lambda = new NodejsFunction(this, "hono-api-lambda", {
            functionName: "hono-api-handler",
            runtime: Runtime.NODEJS_18_X,
            entry: "../api/src/index.ts",
            handler: "handler",
            timeout: Duration.minutes(15),
        });

        const policy = new PolicyDocument({
            statements: [
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    principals: [new AnyPrincipal()],
                    actions: ["execute-api:Invoke"],
                    resources: ["execute-api:/*"],
                }),
                // new PolicyStatement({
                //     effect: Effect.DENY,
                //     principals: [new AnyPrincipal()],
                //     actions: ["execute-api:Invoke"],
                //     resources: ["execute-api:/*"],
                //     conditions: {
                //         NotIpAddress: {
                //             "aws:SourceMap": []
                //         }
                //     }
                // })
            ]
        });

        const api = new LambdaRestApi(this, "hono-api", {
            handler: lambda,
            policy: policy
        });
    }
}