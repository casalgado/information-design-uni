<template>
  <Form
    ref="formObject"
    @submit="handleSubmit"
    :validation-schema="schema"
    :initial-values="form"
    :key="formKey"
  >
    <!-- <button @click="reset">reset</button> -->
    <div class="card input-card">
      <h4>Nombre del Producto</h4>
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
      <h4>Precio</h4>
      <Field
        class="clean_border"
        name="price"
        type="number"
        v-model="form.price"
      />
      <ErrorMessage name="price" />
    </div>

    <div class="card input-card">
      <h4>Categoria</h4>
      <Field
        class="clean_border"
        name="collection"
        as="select"
        v-model="form.collection"
      >
        <option v-for="(o, i) in options" :key="i" :value="o.id">
          {{ o.title }}
        </option>
      </Field>
      <ErrorMessage name="collection" />
    </div>

    <div class="card input-card">
      <h4>Guarnición</h4>
      <FieldArray name="productOptions" v-slot="{ fields, push, remove }">
        <fieldset
          class="field-array-group clean_border"
          v-for="(field, idx) in fields"
          :key="field.key"
        >
          <legend>Opcion {{ idx + 1 }}</legend>
          <label :for="`name_${idx}`">nombre</label>
          <Field :id="`name_${idx}`" :name="`productOptions[${idx}].name`" />
          <ErrorMessage :name="`productOptions[${idx}].name`" />

          <label :for="`addedPrice_${idx}`">precio adicional</label>
          <Field
            :id="`addedPrice_${idx}`"
            :name="`productOptions[${idx}].addedPrice`"
            type="number"
          />
          <ErrorMessage :name="`productOptions[${idx}].addedPrice`" />
          <button
            type="button"
            class="remove-field-button"
            @click="remove(idx)"
          >
            X
          </button>
        </fieldset>

        <button
          type="button"
          class="add-option-button"
          @click="push({ addedPrice: '', name: '' })"
        >
          Agregar Opcion
        </button>
      </FieldArray>
    </div>

    <div class="card input-card">
      <h4>Opciones</h4>
      <FieldArray name="secondOptions" v-slot="{ fields, push, remove }">
        <fieldset
          class="field-array-group clean_border"
          v-for="(field, idx) in fields"
          :key="field.key"
        >
          <legend>Opcion {{ idx + 1 }}</legend>
          <label :for="`name_${idx}`">nombre</label>
          <Field :id="`name_${idx}`" :name="`secondOptions[${idx}].name`" />
          <ErrorMessage :name="`secondOptions[${idx}].name`" />

          <!-- <label :for="`addedPrice_${idx}`">precio adicional</label>
          <Field
            :id="`addedPrice_${idx}`"
            :name="`secondOptions[${idx}].addedPrice`"
            type="number"
          />
          <ErrorMessage :name="`secondOptions[${idx}].addedPrice`" /> -->

          <button
            type="button"
            class="remove-field-button"
            @click="remove(idx)"
          >
            X
          </button>
        </fieldset>

        <button
          type="button"
          class="add-option-button"
          @click="push({ addedPrice: '', name: '' })"
        >
          Agregar Opcion
        </button>
      </FieldArray>
    </div>

    <div class="card input-card">
      <h4>Imagen</h4>
      <input type="file" ref="fileInput" name="image_upload" />
    </div>

    <div class="card input-card">
      <h4>Disponible</h4>
      <div class="radio-cont">
        <Field name="inStock" type="radio">
          <input
            type="radio"
            name="inStock"
            v-model="form.inStock"
            :value="true"
            id="rd1"
          />
          <label class="radio-input-label" for="rd1"> Si </label>
        </Field>
        <Field name="inStock" type="radio">
          <input
            type="radio"
            name="inStock"
            v-model="form.inStock"
            :value="false"
            id="rd2"
          />
          <label class="radio-input-label" for="rd2"> No </label>
        </Field>
      </div>
      <ErrorMessage name="inStock" />
    </div>

    <div class="card input-card">
      <h4>Nuevo</h4>
      <div class="radio-cont">
        <Field name="justAdded" type="radio">
          <input
            type="radio"
            name="justAdded"
            v-model="form.justAdded"
            :value="true"
            id="rd1"
          />
          <label class="radio-input-label" for="rd1"> Si </label>
        </Field>
        <Field name="justAdded" type="radio">
          <input
            type="radio"
            name="justAdded"
            v-model="form.justAdded"
            :value="false"
            id="rd2"
          />
          <label class="radio-input-label" for="rd2"> No </label>
        </Field>
      </div>
      <ErrorMessage name="justAdded" />
    </div>

    <div class="card input-card">
      <h4>En Combo</h4>
      <div class="radio-cont">
        <Field name="combo" type="radio">
          <input
            type="radio"
            name="combo"
            v-model="form.combo"
            :value="true"
            id="rdcombo1"
          />
          <label class="radio-input-label" for="rdcombo1"> Si </label>
        </Field>
        <Field name="combo" type="radio">
          <input
            type="radio"
            name="combo"
            v-model="form.combo"
            :value="false"
            id="rdcombo2"
          />
          <label class="radio-input-label" for="rdcombo2"> No </label>
        </Field>
      </div>
      <ErrorMessage name="combo" />
    </div>

    <div class="card input-card">
      <h4>Vegetariano</h4>
      <div class="radio-cont">
        <Field name="veggie" type="radio">
          <input
            type="radio"
            name="veggie"
            v-model="form.veggie"
            :value="true"
            id="rdv1"
          />
          <label class="radio-input-label" for="rdv1"> Si </label>
        </Field>
        <Field name="veggie" type="radio">
          <input
            type="radio"
            name="veggie"
            v-model="form.veggie"
            :value="false"
            id="rdv2"
          />
          <label class="radio-input-label" for="rdv2"> No </label>
        </Field>
      </div>
      <ErrorMessage name="veggie" />
    </div>

    <div class="card input-card">
      <h4>Picante</h4>
      <div class="radio-cont">
        <Field name="spicy" type="radio">
          <input
            type="radio"
            name="spicy"
            v-model="form.spicy"
            :value="true"
            id="rds1"
          />
          <label class="radio-input-label" for="rds1"> Si </label>
        </Field>
        <Field name="spicy" type="radio">
          <input
            type="radio"
            name="spicy"
            v-model="form.spicy"
            :value="false"
            id="rds2"
          />
          <label class="radio-input-label" for="rds2"> No </label>
        </Field>
      </div>
      <ErrorMessage name="spicy" />
    </div>

    <div class="card input-card">
      <TheButton :text="`${product ? 'editar' : 'crear'} producto`" />
    </div>
  </Form>
</template>

<script setup>
import { ref, watch } from "vue";
import { Field, Form, ErrorMessage, FieldArray } from "vee-validate";
import * as yup from "yup";
import TheButton from "@/components/TheButton.vue";

const props = defineProps({
  product: {
    type: Object,
    default: () => null,
  },
  options: {
    // an array of objects as returned by database allCollections route
    type: Array,
    default: () => [],
  },
});

watch(
  () => props.product,
  () => {
    const product = props.product;
    if (product) {
      // temporary solution while all products get an inStock value
      if (typeof product.inStock == "undefined") {
        product.inStock = true;
      }
      form.value = { ...product };
    }
    formKey.value++;
  }
);

const schema = yup.object().shape({
  title: yup.string().required("producto debe tener nombre"),
  description: yup.string(),
  price: yup
    .number("precio debe ser un numero")
    .required("producto debe tener precio"),
  collection: yup.string().required("producto debe tener categoria"),
  productOptions: yup.array().of(
    yup.object().shape({
      name: yup.string().required("opcion debe tener nombre").label("name"),
      addedPrice: yup
        .number("precio debe ser un numero")
        .required("opcion debe tener precio")
        .label("addedPrice"),
    })
  ),
  secondOptions: yup.array().of(
    yup.object().shape({
      name: yup.string().required("opcion debe tener nombre").label("name"),
    })
  ),
});

const formKey = ref(1);
const form = ref({
  title: "",
  description: "",
  price: "",
  collection: "",
  productOptions: [],
  secondOptions: [],
  inStock: true,
  justAdded: false,
  combo: false,
  veggie: false,
  spicy: false,
});

const emit = defineEmits(["submitted"]);

const formObject = ref(null);
const fileInput = ref(null);

function handleSubmit(values) {
  const file = fileInput.value.files.item(0);

  if (props.product) {
    values.images = props.product.images;
  }

  emit("submitted", {
    values: values,
    files: { featured: file },
  });
  console.log("values", values);
  console.log("file", file);
  //reset();
}

function reset() {
  formObject.value.setValues("");
}
</script>

<style scoped>
.field-array-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.field-array-group span {
  grid-column: span 2;
}

button {
  background-color: var(--color-admin-theme);
  border: none;
  outline: none;
  border-radius: 5px;
  color: var(--vt-c-white);
  cursor: pointer;
}

.remove-field-button {
  background-color: var(--button-danger);
  position: absolute;
  top: -22px;
  left: 90px;
}

.add-option-button {
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 5px;
}
</style>
