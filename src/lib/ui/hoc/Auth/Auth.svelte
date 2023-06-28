<script lang="ts">
  import { getContext } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  import type { AuthContext } from "$lib/logic/typing/stores.auth";

  const { url } = $page;
  const context = getContext<AuthContext>("auth");
  const { show, pathname, isAuth, pages, redirect: to, getstoraged } = $context;

  $: {
    const inAuthPage = $pages.some((page) => url.pathname.startsWith(page));

    if ($isAuth && inAuthPage) {
      $show = false;
      if (browser) {
        goto($pathname);
      }
    } else if ((!$isAuth && inAuthPage) || ($isAuth && !inAuthPage)) {
      $show = true;
      $isAuth = getstoraged().auth;
    } else {
      $show = false;
      $pathname = url.pathname;
      if (browser) {
        goto($to);
      }
    }
  }
</script>

{#if $show}
  <slot {isAuth} />
{/if}
