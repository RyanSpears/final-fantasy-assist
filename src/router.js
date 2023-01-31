import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "./components/Dashboard.vue";
import NotFound from "./components/NotFound.vue";
import Characters from "./components/Characters.vue";
import CharacterEdit from "./components/CharacterEdit.vue";
import CharacterNew from "./components/CharacterNew.vue";
import Auth from "./components/Auth.vue";
import Account from "./components/Account.vue";
import { useAuthStore } from "./stores/authStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/dashboard", component: Dashboard },
    { path: "/dashboard", name: "dashboard", component: Dashboard },
    { path: "/characters", name: "characters", component: Characters },
    { path: "/characters/new", name: "character-new", component: CharacterNew },
    {
      path: "/characters/:characterId",
      name: "character-edit",
      component: CharacterEdit,
    },
    { path: "/profile", name: "profile", component: Account },
    { path: "/login", name: "login", component: Auth },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to) => {
  const store = useAuthStore();
  if (to.name !== "login" && !store.getIsAuthenticated) {
    return "/login";
  }
  if (to.name == "login" && store.getIsAuthenticated) {
    return "/dashboard";
  }
});

export default router;
