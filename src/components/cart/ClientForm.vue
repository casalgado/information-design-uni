<template>
  <Form
    ref="formObject"
    @submit="handleSubmit"
    :validation-schema="schema"
    :key="formKey"
  >
    <div class="card input-card">
      <div>
        <h4>Nombre</h4>
        <Field class="clean_border" name="client" v-model="form.client" />
        <ErrorMessage name="client" />
      </div>
      <div>
        <h4>Direccion</h4>
        <Field class="clean_border" name="address" v-model="form.address" />
        <ErrorMessage name="address" />
      </div>

      <div class="span1">
        <h4>Barrio</h4>
        <Field class="clean_border" name="locality" v-model="form.locality" />
        <ErrorMessage name="locality" />
      </div>

      <div class="span1">
        <h4># de Casa o Apto</h4>
        <Field
          class="clean_border"
          name="houseNumber"
          v-model="form.houseNumber"
        />
        <ErrorMessage name="houseNumber" />
      </div>
      <div>
        <h4>Teléfono</h4>
        <Field class="clean_border" name="phone" v-model="form.phone" />
        <ErrorMessage name="phone" />
      </div>
      <div>
        <h4>Método de Pago</h4>
        <div class="radio-cont">
          <Field
            name="payment"
            type="radio"
            v-model="form.payment"
            :value="'Efectivo'"
            id="rd1"
          >
          </Field>
          <label class="radio-input-label" for="rd1"> Efectivo </label>
          <Field
            name="payment"
            type="radio"
            v-model="form.payment"
            :value="'Transferencia'"
            id="rd2"
          >
          </Field>
          <label class="radio-input-label" for="rd2"> Transferencia </label>
          <Field
            name="payment"
            type="radio"
            v-model="form.payment"
            :value="'Datafono'"
            id="rd2"
          >
          </Field>
          <label class="radio-input-label" for="rd3"> Datáfono </label>
        </div>
        <ErrorMessage name="payment" />
      </div>

      <div>
        <h4>Envío</h4>
        <div class="radio-cont">
          <Field
            name="delivery"
            type="radio"
            v-model="form.delivery"
            :value="'Domicilio'"
            id="rd4"
          >
          </Field>
          <label class="radio-input-label" for="rd4">
            Enviar a Domicilio
          </label>
          <Field
            name="delivery"
            type="radio"
            v-model="form.delivery"
            :value="'En Sitio'"
            id="rd5"
          >
          </Field>
          <label class="radio-input-label" for="rd5"> Buscar en Sitio </label>
        </div>
        <ErrorMessage name="delivery" />
      </div>
    </div>

    <div class="card input-card">
      <TheButton :text="'Hacer Pedido'" :iconPath="iconPath" />
    </div>
  </Form>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import TheButton from "@/components/TheButton.vue";

const schema = yup.object({
  client: yup.string().required("debe incluir nombre"),
  address: yup.string().required("debe incluir direccion"),
  phone: yup.string().required("debe incluir telefono"),
  payment: yup.string().required("debe incluir metodo de pago"),
  delivery: yup.string().required("debe incluir metodo de envio"),
});

const formKey = ref(1);
const form = ref({
  client: "",
  address: "",
  phone: "",
  payment: "",
  delivery: "",
  locality: "",
  houseNumber: "",
});

const emit = defineEmits(["submitted"]);
const formObject = ref(null);

onMounted(() => {
  if (localStorage.getItem("clientInfo")) {
    form.value = JSON.parse(localStorage.getItem("clientInfo"));
  }
});

function handleSubmit(values) {
  emit("submitted", values);
  //reset();
}

const iconPath = computed(() => {
  let path = "/images/";
  if (form.value.delivery == "Domicilio") {
    path += "motorcycle-solid.svg";
  } else if (form.value.delivery == "En Sitio") {
    path += "people-carry-box-solid.svg";
  }
  return path;
});

function reset() {
  formObject.value.setValues("");
}
</script>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.card > * {
  grid-column: span 2;
}
.clean_border {
  margin-bottom: 10px;
  width: 98%;
}

@media only screen and (max-width: 600px) {
  .radio-cont {
    margin-top: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }

  .radio-cont > * {
    min-width: 0;
    min-height: 0;
  }
}

.span1 {
  grid-column: span 1 !important;
}
</style>
