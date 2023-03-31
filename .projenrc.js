const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.72.1',
  defaultReleaseBranch: 'main',
  name: 'pipeline-app',

  deps: ['@cdklabs/cdk-codepipeline-extensions'],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();