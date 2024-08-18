<template>
    <v-container>
        <Form v-slot="{meta}">
            <v-row >
                <v-col cols="12">
                    <Field name="usuario" v-model="usuario" rules="required"
                    v-slot="{ errorMessage, handleBlur, field }">
                    <v-text-field label="Usuario" v-model="usuario" @blur="handleBlur" :error-messages="errorMessage" v-bind="field"></v-text-field>
                </Field>
                </v-col>
                <v-col cols="12"> 
                    <Field name="contrasenia" v-model="contrasenia" rules="required"
                    v-slot="{ errorMessage, handleBlur, field }">
                    <v-text-field  type="password" label="Contraseña" v-model="contrasenia" @blur="handleBlur" :error-messages="errorMessage" v-bind="field">   
                    </v-text-field>
                </Field>
                </v-col>
                <v-col cols="12">
                    <p class="text-red-600">{{ mensajeError !=='' ? mensajeError : '' }}</p>
                </v-col>
                <v-col>
                    <v-btn color="blue" @click="iniciarSesion" :disabled="!meta.valid">Iniciar sesión</v-btn>
                </v-col>
            </v-row>
        </Form>
    </v-container>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "../../router/buildRoute";
import { useLogin } from "../service/useLogin";
import { Form,Field } from "vee-validate";
const usuario =ref("");
const contrasenia = ref("");
const mensajeError = ref("");
const iniciarSesion = async() =>{
    try{
        mensajeError.value = '';
        const resp = await useLogin().iniciarSesion({
        contrasenia:contrasenia.value,
        usuario:usuario.value
     })
     if(resp){
        router.push("/vuelos")
     }
    }catch(ex:any){
        mensajeError.value = ex.response.data;
    }
}



</script>
