import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/authStore";
import Account from "./components/Account.vue";
import Auth from "./components/Auth.vue";
import Books from "./components/Books.vue";
import CharacterEdit from "./components/CharacterEdit.vue";
import CharacterNew from "./components/CharacterNew.vue";
import Characters from "./components/Characters.vue";
import Dashboard from "./components/Dashboard.vue";
import Monsters from "./components/Monsters.vue";
import NotFound from "./components/NotFound.vue";

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
    { path: "/monsters", name: "monsters", component: Monsters },
    { path: "/books", name: "books", component: Books },
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
