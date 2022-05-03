<template>
  <div id="app">
  <router-view />
  </div>
</template>

<style>
body {
  margin : 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  margin: 10px;
  padding: 0.5rem 3rem;

  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;

  display: inline-block;
  width: auto;

  border: none;
  border-radius: 5px;

  cursor: pointer;

  transition: 0.5s;
}
button:active,
button:hover,
button:focus {
  background: var(--button-hover-bg-color);
  outline: 0;
}
button:disabled {
  opacity: 0.5;
}
</style>
