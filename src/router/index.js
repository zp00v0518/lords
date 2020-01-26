import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/organism/Main/Main';
import config from '../../backend/config/config';
// import Main from '../memory/Test'

Vue.use(Router);

const servers = config.db.collections.servers.map(item => {
  return '/' + item.name;
});

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      alias: servers
    }
  ]
});
