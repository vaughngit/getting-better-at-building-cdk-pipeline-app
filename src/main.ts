import * as path from 'path';
import { Calendar, PipelineWithChangeControl } from '@cdklabs/cdk-codepipeline-extensions';
import { App, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Alarm, Metric, TreatMissingData } from 'aws-cdk-lib/aws-cloudwatch';
import { Code, Repository } from 'aws-cdk-lib/aws-codecommit';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const sourceRepository = new Repository(this, 'workshop-repo', {
      repositoryName: 'workshop-repo',
      code: Code.fromZipFile(path.join(__dirname, './sample.zip'), 'main'),
    });

    const schedule = Schedule.rate(Duration.minutes(1));

    const calendar = Calendar.path({ calendarName: 'calendar.ics', calendarPath: path.join(__dirname) });

    const metric = new Metric({
      namespace: 'DOP-401',
      metricName: 'SomethingBroke',
    });

    new Alarm(this, 'alarm', {
      metric,
      alarmName: 'something-broke-alarm',
      alarmDescription: 'no-deploy',
      threshold: 1,
      evaluationPeriods: 1,
      treatMissingData: TreatMissingData.BREACHING,
    });

    new PipelineWithChangeControl(this, 'pipeline-with-change-control', {
      changeControlCalendar: calendar,
      pipelineName: 'pipeline-with-change-control',
      sourceRepository,
      changeControlCheckSchedule: schedule,
      searchTerms: ['no-deploy'],
    });
  }
}

// for development, use account/region from cdk cli
const env = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'pipeline-with-time-windows-app', { env });

app.synth();
