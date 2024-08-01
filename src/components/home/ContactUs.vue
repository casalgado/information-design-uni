<script setup>
import emailjs from "@emailjs/browser";
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import TheButton from "@/components/TheButton.vue";

const schema = yup.object({
  name: yup.string().required("por favor incluir nombre"),
  email: yup.string().email().required("por favor incluir email"),
  subject: yup.string().required("por favor incluir asunto"),
  message: yup.string().required("por favor incluir mensaje"),
});

const formKey = ref(1);
const form = ref({
  name: "",
  email: "",
  subject: "",
  phone: "",
  message: "",
});

const emit = defineEmits(["submitted"]);
const formObject = ref(null);

const path = ref("messages");
const messageSent = ref(false);

function handleSubmit(values) {
  console.log(emailjs);
  let serviceID = "service_vt5c69e";
  let templateID = "template_9o7iyad";
  let publicKey = "BZn5fgJhVL9RTC44Z";
  let templateParams = {
    name: form.value.name,
    email: form.value.email,
    subject: form.value.subject,
    message: form.value.message,
    phone: form.value.phone,
  };

  emailjs.send(serviceID, templateID, templateParams, publicKey).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
      alert("Message Sent!");
    },
    (err) => {
      console.log("FAILED...", err);
    }
  );

  let messageRef = collection(dbRef, path.value);
  let newItem = doc(messageRef);

  setDoc(newItem, form.value)
    .then(() => {
      console.log("Message Sent");
      messageSent.value = true;
    })
    .catch((error) => {
      console.error("Error in promise operation:", error);
    });

  formKey.value++;
}
</script>

<template>
  <section class="full-width">
    <Form
      ref="formObject"
      @submit="handleSubmit"
      :validation-schema="schema"
      :initial-values="form"
      :key="formKey"
      class="form--wrapper"
    >
      <div class="">
        <Field
          class="clean_border"
          placeholder="Name"
          type="text"
          name="name"
          v-model="form.name"
        />
        <ErrorMessage name="name" />
      </div>

      <div class="">
        <Field
          class="clean_border"
          placeholder="E-mail"
          type="text"
          name="email"
          v-model="form.email"
        />
        <ErrorMessage name="email" />
      </div>

      <div class="">
        <Field
          class="clean_border"
          placeholder="Subject"
          type="text"
          name="subject"
          v-model="form.subject"
        />
        <ErrorMessage name="subject" />
      </div>

      <!-- <div class="">
      <Field
        class="clean_border"
        placeholder="Teléfono"
        type="text"
        name="phone"
        v-model="form.phone"
      />
      <ErrorMessage name="business_name" />
    </div> -->

      <div class="message">
        <Field
          class="clean_border"
          placeholder="Message"
          name="message"
          as="textarea"
          v-model="form.message"
        />
        <ErrorMessage name="message" />
      </div>

      <TheButton :text="`Send`" />
    </Form>
  </section>
</template>

<style scoped>
section {
  background: rgb(235, 235, 235);
}
.form--wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  max-width: 1200px;
  margin: 0rem auto;
  padding: 3rem 1rem;
}

button {
  background-color: var(--color-accent) !important;
  border: none;
  outline: none;
  cursor: pointer;
  justify-content: center;
  font-weight: bold;
  font-size: 0.8rem;
}

button p {
  font-size: 2rem !important;
  font-weight: bold !important;
}

input,
input:focus,
textarea:focus,
textarea {
  outline: none;
  border: none;
  min-height: 50px;
  background-color: #f6f5f5;
  width: 100%;
  padding: 20px 20px;
}

input[type="text"],
textarea {
  background-color: #f6f5f5;
}

textarea,
textarea:focus {
  min-height: 150px;
}

.message textarea {
  height: 100%;
}

@media screen and (max-width: 800px) {
  button {
    grid-column: 1/2;
    font-size: 0.9rem;
  }

  .form--wrapper {
    display: grid;
    grid-template-columns: 1fr;
  }
}

@media screen and (min-width: 800px) {
  .message {
    grid-column: 2/3;
    grid-row: 1/ 4;
  }

  button {
    grid-column: 2/3;
  }
}
</style>
