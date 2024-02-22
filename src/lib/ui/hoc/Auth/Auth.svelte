<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { useAuth } from "$lib/logic/stores/index.js";

  const { url } = $page;
  const auth = useAuth();
  const { show, pathname, authorized, pages, redirect, storaged } = $auth;

  $: {
    const unprotected = $pages.some((page) => page === url.pathname);

    if ($authorized && unprotected) {
      $show = false;
      if (browser) {
        goto($pathname, { replaceState: true });
      }
    } else if ((!$authorized && unprotected) || ($authorized && !unprotected)) {
      $show = true;
      $authorized = storaged().authorized;
    } else {
      $show = false;
      $pathname = `${url.pathname}${url.search}`;
      if (browser) {
        goto($redirect, { replaceState: true });
      }
    }
  }
</script>

{#if $show}
  <slot authorized={$authorized} />
{/if}
