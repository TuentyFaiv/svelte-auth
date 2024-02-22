<script lang="ts">
  import { useAuth, Auth } from "$lib";

  const auth = useAuth();

  function onSignin() {
    $auth.authorize({
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
