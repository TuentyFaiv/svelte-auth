<script lang="ts">
  import { authContext } from "$lib";
  import config from "@config";

  authContext(config.auth_pages, config.signin);
</script>

<slot />
