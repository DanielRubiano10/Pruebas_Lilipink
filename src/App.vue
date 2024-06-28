<template>
  <nav class="navbar navbar-expand-lg nav bg-pink">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Products</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active" aria-current="page" href="#">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/register" class="nav-link active" aria-current="page" href="#">Register</RouterLink>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
  <div class="container-fluid mt-3">
    <router-view />
  </div>
</template>

<style scoped>
.bg-pink {
  background-color: pink !important;
}
</style>

<script>

</script>

<style scoped></style>
