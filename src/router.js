import Vue from "vue";
import Router from "vue-router";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import WordBank from "./views/WordBank.vue";
import Home from "./views/Home.vue";
import Games from "./views/Games.vue";
import NewCategory from "./views/NewCategory.vue";
import NewPage from "./views/NewPage.vue";
import NewUpload from "./views/NewUpload.vue";
import Categories from "./views/Categories.vue";
import Pages from "./views/Pages.vue";
import EditPage from "./views/EditPage.vue"
import Test from "./views/TestTipTap.vue"
import firebase from 'firebase'

Vue.use(Router);

const router = new Router({
  routes: [{
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/wordbank",
      name: "word-bank",
      component: WordBank,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/games",
      name: "games",
      component: Games,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/new-category",
      name: "new-category",
      component: NewCategory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/new-page",
      name: "new-page",
      component: NewPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/new-upload",
      name: "new-upload",
      component: NewUpload,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/categories",
      name: "categories",
      component: Categories,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/pages/:yearGroup",
      name: "pages",
      component: Pages,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit-page/:pageSlug",
      name: "edit-page",
      component: EditPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/test",
      name: "test",
      component: Test,
      meta: {
        requiresAuth: true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  // check to see if router requires auth
  if (to.matched.some(req => req.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      // user signed in, proceed to route
      next()
    } else {
      // no user signed in, redirect to login
      next({
        name: 'login'
      })
    }
  } else {
    next()
  }
})

export default router