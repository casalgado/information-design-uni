<template>
  <Form
    ref="formObject"
    @submit="handleSubmit"
    :validation-schema="schema"
    :key="formKey"
  >
    <div class="card input-card">
      <h4>Nombre de la Categoria</h4>
      <Field class="clean_border" name="title" v-model="form.title" />
      <ErrorMessage name="title" />
    </div>

    <div class="card input-card">
      <h4>Descripcion</h4>
      <Field
        class="clean_border"
        name="description"
        as="textarea"
        v-model="form.description"
      />
      <ErrorMessage name="description" />
    </div>

    <div class="card input-card">
      <h4>Disponible como acompañante?</h4>
      <div class="radio-cont">
        <Field
          name="canBeAddedToCartItem"
          type="radio"
          v-model="form.canBeAddedToCartItem"
          :value="true"
          id="rd1"
        >
        </Field>
        <label class="radio-input-label" for="rd1"> Si </label>
        <Field
          name="canBeAddedToCartItem"
          type="radio"
          v-model="form.canBeAddedToCartItem"
          :value="false"
          id="rd2"
        >
        </Field>
        <label class="radio-input-label" for="rd2"> No </label>
      </div>

      <ErrorMessage name="canBeAddedToCartItem" />
    </div>

    <div class="card input-card">
      <TheButton :text="`${collection ? 'editar' : 'crear'} categoria`" />
    </div>
  </Form>
</template>

<script setup>
import { ref, watch } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import TheButton from "@/components/TheButton.vue";

const props = defineProps({
  collection: {
    type: Object,
    default: () => null,
  },
});
const schema = yup.object({
  title: yup.string().required("categoria debe tener nombre"),
});

const formKey = ref(1);
const form = ref({
  title: "",
  description: "",
  canBeAddedToCartItem: false,
  created_at: null,
  order: null,
});

const emit = defineEmits(["submitted"]);
const formObject = ref(null);

function handleSubmit() {
  emit("submitted", form.value);
  reset();
}

function reset() {
  formObject.value.setValues("");
}

watch(
  () => props.collection,
  () => {
    const collection = props.collection;
    if (collection) {
      form.value = { ...collection };
    }
    formKey.value++;
  }
);
</script>

<style scoped></style>
