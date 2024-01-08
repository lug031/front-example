<template>
  <header class="bg-white h-20">
    <nav class="h-full flex justify-between container items-center px-4">
      <div>
        <NuxtLink to="/" class="text-xl text-ct-dark-600 font-semibold">VUE APP</NuxtLink>
      </div>
      <ul class="flex items-center gap-4">
        <li>
          <div v-if="isLoggedIn" class="is-logged-in">
            <div class="logged-in-logo-menu">
              <NxNavbar :menu="isLoggedInMenu" theme="none" size="small" @clicked="menuClicked" />
              <NxNavbar :menu="isAuthPermisosMenu" theme="none" size="small" @clicked="menuClicked" />
            </div>
            <div class="avatar-block">
              <div class="avatar-dropdown">
                <NxDropdown :menu="profileMenu" @clicked="menuClicked">
                  <NxAvatar :src="infoUser?.photoURL ? infoUser.photoURL : ''" />
                </NxDropdown>
              </div>
            </div>
          </div>
          <div v-else class="is-not-logged-in">
            <NxNavbar :menu="isNotLoggedInMenu" theme="none" size="small" class="login-register-menu"
              @clicked="menuClicked" />
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { NxLink, NxLinks, User } from "~~/types/types";
import { useUserStore } from '~~/stores/user';
import NxDropdown from "~/features/shared/NxDropdown.vue";
import NxAvatar from "~/features/shared/NxAvatar.vue";
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import NxNavbar from "./NxNavbar.vue";

const { logout, infoUser } = useFirebaseAuth();

const userStore = useUserStore();
const isAuthPermisosMenu = computed(() => userStore.authPermisos);
const isLoggedIn = userStore.isLoggedIn;
const user = ref(<User | null>null);

/*watchEffect(() => {
  user.value = userStore.user;
});*/

const isNotLoggedInMenu = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Login",
    link: "/login",
  },
];

let isLoggedInMenu = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Insurance",
    link: "/insurance",
  },
  {
    name: "User",
    link: "/user",
  },
  {
    name: "Consulta",
    link: "/permisos",
  },
] as NxLinks;

// User profile menu
const profileMenu = [
  {
    name: "Profile",
    link: "/profile",
  },
  {
    name: "Logout",
  },
] as NxLinks;

/**
 * @desc Processes clicked menu item
 * @param link Clicked menu item
 */
function menuClicked(menuItem: NxLink) {
  if (menuItem.name === "Logout") logoutUser();
  else navigateTo(menuItem.link);
}

const logoutUser = async () => {
  let res = confirm('¿Estás seguro de que quieres cerrar sesión?');
  try {
    if (res) {
      userStore.setIsLoggedIn(false);
      await logout();
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

computed(async () => {
  try {
  } catch (error) { }
})
</script>

<style scoped>
.is-logged-in,
.is-not-logged-in {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.login-register-menu {
  margin-left: auto;
}

.logged-in-logo-menu {
  display: flex;
  align-items: center;
}

.avatar-block {
  margin-left: auto;
  display: flex;
}

.avatar-dropdown {
  display: flex;
  align-items: center;
}
</style>