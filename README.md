# Svelte Auth

`npm install @tuentyfaiv/svelte-auth`

## Examples
### Instance context
```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import { authContext } from "@tuentyfaiv/svelte-auth";
  // configure auth routes and redirection url

  authContext(["/signin", "/forgot"], "/");
</script>
```
### Protect page
```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { Auth } from "@tuentyfaiv/svelte-auth";
</script>

<Auth>
  <!-- ...content -->
</Auth>
```