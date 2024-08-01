<script setup></script>

<template>
  <section>
    <div class="intro_text">
      <p>
        CANAMARINE SERVICES LP provides logistics, recruiting, staffing and
        operational services to the maritime industry, with special aim to
        support the transportation industry, oil and gas platforms, upstream and
        midstream hydrocarbons industry, fuel and comodities logisticts, among
        other business activities.
      </p>
      <p>
        With a strong network of business allies and a top-notch talent, our
        company can assist your business worldwide, providing you the best
        results and optimizing your goals and global reach.
      </p>
    </div>
    <div>
      <img
        class="red_logo"
        src="/logos/logo-rojo.svg"
        alt="red canamarine logo"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content;
  place-items: center;
}

.red_logo {
  width: 190px;
  margin: 60px;
}

.intro_text p {
  color: #434343;
  font-size: 1.1rem;
  line-height: 1.5;
  padding: 1rem;
  margin: 1rem;
  text-align: justify;
  border-radius: 15px;
}

@media only screen and (max-width: 800px) {
  section {
    grid-template-columns: 1fr;
    grid-template-rows: max-content max-content;
  }
}
</style>
