import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/organism/Main/Main";
import config from '../../backEnd/config/config'

Vue.use(Router);

const servers = config.db.collections.servers.map(name => {
  return '/'+name;
})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
      alias: servers,
    }
  ]
});
