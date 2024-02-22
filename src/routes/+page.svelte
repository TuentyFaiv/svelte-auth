<script lang="ts">
  import { Auth, useAuth } from "$lib";

  const auth = useAuth();
</script>

<Auth>
  <h1>Welcome to your library project</h1>
  <h2>this is a public page</h2>
  <p>
    Create your package using @sveltejs/package and preview/showcase your work
    with SvelteKit
  </p>
  <p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
  </p>

  <button type="button" on:click={$auth.unauthorize}> Signout </button>
</Auth>
