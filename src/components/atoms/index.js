import Vue from 'vue';
/* eslint-disable no-useless-escape */

const requireComponent = require.context(
  // Look for files in the current directory
  '.',
  // Look in subdirectories
  true,
  /\index.js$/
);

requireComponent.keys().forEach(fileName => {
  const arrPath = fileName.split('/');
  if (fileName !== './index.js' && arrPath.length <= 3) {
    // Get the component config
    const componentConfig = requireComponent(fileName);
    // Get the component name
    const componentName = fileName.replace('/index.js', '').substring(2);
    // console.log(componentName);

    // Globally register the component
    Vue.component(componentName, componentConfig.default || componentConfig);
  }
});
