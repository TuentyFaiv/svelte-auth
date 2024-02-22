<script lang="ts">
  import { authContext } from "$lib";
  import config from "@config";

  const auth = authContext(config.auth_pages, config.signin);

  const { credentials } = $auth;
</script>

<slot />
