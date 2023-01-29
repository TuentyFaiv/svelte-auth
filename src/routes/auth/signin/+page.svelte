<script lang="ts">
  import { auth, Auth } from "$lib";

  function onSignin() {
    $auth.authenticate({
      token: "some-token",
      user: {
        id: "some-id",
        name: "Test user",
        email: "test@test.signin",
        avatar: null,
      },
    });
  }
</script>

<Auth>
  <h1>Signin page</h1>
  <button on:click={onSignin} type="button">Signin</button>
</Auth>
