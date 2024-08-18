<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                Bienvenido <span class="font-bold"> {{ user?.nombre }} {{ user?.apellidoPaterno }} {{
                    user?.apellidoMaterno }}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <input type="date" v-model="filtro.fecha">
            </v-col>
            <v-col cols="4">
                <v-select v-model="filtro.destino" item-title="lugar" item-value="id" :items="destinos"
                    label="Destino"></v-select>
            </v-col>
            <v-col cols="4">
                <v-select v-model="filtro.aerolinea" item-title="lugar" item-value="id" :items="aerolineas"
                    label="Aerolinea"></v-select>
            </v-col>
            <v-col cols="4">
                <v-btn color="green" @click="obtenerVuelos">Buscar</v-btn>
            </v-col>
        </v-row>
        <v-row v-if="items.length === 0" class="p-2">
            Sin vuelos
        </v-row>
        <v-row v-for="item in items" class="p-2">
            <v-col cols="12">
                <v-card :key="item.vueloId">
                    <template v-slot:title>
                        <span class="font-weight-black">Salida {{ dayjs(item.horaSalida).format("hh:mm A") }}</span> -
                        <span class="font-weight-black">#Vuelo {{ item.vueloId }}</span> -
                        <span class="font-weight-black">{{ item.aerolineaNombre }}</span>
                    </template>

                    <v-card-text class="bg-surface-light pt-4 text-orange-400">
                        <v-row>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="5">
                                        <p> {{ item.aeropuertoOrigenCodigo }}</p>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-icon>mdi-arrow-right-thick</v-icon>
                                    </v-col>
                                    <v-col cols="5">
                                        {{ item.aeropuertoDestinoCodigo }}
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <p class="ml-2"> {{ item.duracionViaje }} de vuelo</p>
                                        </v-col>
                                    </v-row>
                                </v-row>
                            </v-col>
                            <v-col cols="2">
                                <v-btn color="green" @click="() => { verPrecios(item) }">Ver precios</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog transition="dialog-bottom-transition" width="70%" v-model="mostrarPrecios">
            <template v-slot:default="{ isActive }">
                <v-card>
                    <v-toolbar title="Elige la clase del vuelo"></v-toolbar>

                    <v-card-text class="text-h2 pa-12">
                        <v-row>
                            <v-col cols="4">
                                <v-row><label class="text-xl">Ecónomico</label></v-row>
                                <v-row><v-btn color="green" @click="validaMostrarAsientos(CLASE.ECONOMICO)">${{
                                    precioPorClase(CLASE.ECONOMICO).toFixed(2) }}</v-btn></v-row>
                            </v-col>
                            <v-col cols="4">
                                <v-row><label class="text-xl">Normal</label></v-row>
                                <v-row><v-btn color="green" @click="validaMostrarAsientos(CLASE.NORMAL)">${{
                                    precioPorClase(CLASE.NORMAL).toFixed(2) }}</v-btn></v-row>
                            </v-col>
                            <v-col cols="4">
                                <v-row><label class="text-xl">Ejecutivo</label></v-row>
                                <v-row><v-btn color="green" @click="validaMostrarAsientos(CLASE.EJECUTIVO)">${{
                                    precioPorClase(CLASE.EJECUTIVO).toFixed(2) }}</v-btn></v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions class="justify-end">
                        <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <v-dialog transition="dialog-bottom-transition" width="70%" v-model="mostrarAsientos">
            <template v-slot:default="{ isActive }">
                <v-card>
                    <v-toolbar title="Elige tus asientos"></v-toolbar>

                    <v-card-text class="text-h2 pa-12">
                        <v-row>
                            <v-col cosl="12">
                                Total : ${{ obtenerTotal }}
                            </v-col>
                            <v-col cols="12" align-self="center" class="flex place-content-center">
                                <asientos v-if="mostrarAsientos" v-model:value="asientosSeleccionados"
                                    :vuelo-id="vueloId"></asientos>
                            </v-col>
                            <v-col cols="12" align-self="center" class="flex place-content-center">
                                <v-btn color="blue" class="text-white" :loading="loading" :disabled="loading"
                                    @click="apartarAsientos">Apartar</v-btn>
                                <v-btn color="#78AC66" :loading="loading" :disabled="loading"
                                    @click="comprar">Comprar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions class="justify-end">
                        <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <v-dialog transition="dialog-bottom-transition" width="70%" v-model="mostrarPago">
            <template v-slot:default="{ isActive }">
                <v-card>
                    <v-toolbar title="Elige tus asientos"></v-toolbar>

                    <v-card-text class="text-h2 pa-12">
                        <Form v-slot="{ meta }">
                            <v-row>
                                <v-col cosl="12">
                                    Total : ${{ obtenerTotal.toFixed(2) }}
                                </v-col>
                                <v-col cols="12" align-self="center" class="flex place-content-center">
                                    <Field name="numTarjeta" v-model="numTarjeta" rules="required"
                                        v-slot="{ errorMessage, handleBlur, field }">
                                        <v-text-field @input="soloNumeros" maxLength="16" label="Numero de tarjeta"
                                            v-model="numTarjeta" @blur="handleBlur" :error-messages="errorMessage"
                                            v-bind="field"></v-text-field>
                                    </Field>
                                </v-col>
                                <v-col cols="12" align-self="center" class="flex place-content-center">
                                    <v-btn color="#78AC66" :loading="loading"
                                        :disabled="(loading || !meta.valid) || (obtenerTotal == 0 || !meta.valid)"
                                        @click="pagar">Pagar</v-btn>
                                </v-col>
                            </v-row>
                        </Form>
                    </v-card-text>

                    <v-card-actions class="justify-end">
                        <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-container>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, onBeforeMount, onBeforeUnmount, computed } from "vue";
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { IVuelo } from "../interfaces/Vuelo";
import { IHeadersTable, SortItem } from "../../../interfaces/DataTable";
import { useVuelo } from "../service/useVuelo";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../login/store/stateLogin";
import Asientos from "../../../modules/asientos/screen/Asientos.vue";
import { useAsiento } from "../../asientos/service/useAsiento";
import { IAsiento, IAsientoPost } from "../../asientos/interfaces/Asiento";
import { Form, Field } from "vee-validate";
const asientosSeleccionados = ref<IAsiento[]>([]);
const { user } = storeToRefs(useLoginStore());
const filtro = ref({
    fecha: dayjs(new Date).format('YYYY-MM-DD'),
    destino: 0,
    aerolinea: 0
})
const display = ref(useDisplay);
const sortBy = ref<SortItem[]>([{
    key: "horaSalida", order: "desc"
}]);
const destinos = ref([
    {
        lugar: "",
        id: 0
    },
    {
        lugar: "VER",
        id: 2
    }, {
        lugar: "MEX",
        id: 3
    }, {
        lugar: "MTY",
        id: 4
    }, {
        lugar: "VSA",
        id: 5
    }, {
        lugar: "TGZ",
        id: 6
    }, {
        lugar: "OAX",
        id: 7
    }, {
        lugar: "CUN",
        id: 8
    },
])
const aerolineas = ref([
    {
        lugar: "",
        id: 0
    },
    {
        lugar: "Aeroméxico",
        id: 1
    }, {
        lugar: "Volaris",
        id: 2
    }, {
        lugar: "Viva Aerobus",
        id: 3
    },

])
const mostrarPrecios = ref(false);
const mostrarAsientos = ref(false);
const mostrarPago = ref(false);
const loading = ref(false);
const numTarjeta = ref();
const claseElegida = ref<string>("");

const vueloId = ref(0);
const vueloSeleccionado = ref<IVuelo | null>(null);
enum CLASE {
    EJECUTIVO = 'EJECUTIVO',
    NORMAL = 'NORMAL',
    ECONOMICO = 'ECONOMICO'
}
enum TipoUsuario {
    BASICO = 1,
    PREMIUM = 2
}
const items = ref<IVuelo[]>([]);
const obtenerVuelos = async () => {
    const resp = await useVuelo().obtenerVuelos({
        aerolienaId: filtro.value.aerolinea === 0 ? null : filtro.value.aerolinea,
        aeropuertoDestinoId: filtro.value.destino === 0 ? null: filtro.value.destino,
        horaSalida: null,
        fecha: filtro.value.fecha
    });
    if (resp) {
        items.value = resp;
    }
};

const precioPorClase = (clase: string) => {
    const precioVuelo = vueloSeleccionado.value ? vueloSeleccionado.value.costo : 0;
    let nuevoPrecio = 0;
    switch (clase) {
        case CLASE.ECONOMICO:
            nuevoPrecio = precioVuelo;
            break;
        case CLASE.NORMAL:
            nuevoPrecio = precioVuelo + (precioVuelo * 0.35);
            break;
        case CLASE.EJECUTIVO:
            nuevoPrecio = precioVuelo + (precioVuelo * 0.45);
            break;
    }
    return nuevoPrecio;
}

const verPrecios = (item: IVuelo) => {
    const hoy = new Date();
    const horaVuelo = dayjs(item.horaSalida).toDate();
    const differenceInHours = dayjs(horaVuelo).diff(dayjs(hoy), 'hour');
    if (differenceInHours > 3) {
        mostrarPrecios.value = true;
        vueloSeleccionado.value = item;
        vueloId.value = item.vueloId;
    }
}

const validaMostrarAsientos = async (clase: string) => {
    if (user.value?.tipoUsuarioId === TipoUsuario.PREMIUM) {
        claseElegida.value = clase;
        await obtenerAsientos();
        mostrarAsientos.value = true
    }
}

const obtenerAsientos = async () => {
    if (vueloSeleccionado.value) {
        const asientos = await useAsiento().obtenerAsiento(vueloSeleccionado.value.vueloId);
        if (asientos) {
            const _asientosSeleccionados: IAsiento[] = [];
            asientos.forEach((element: IAsiento) => {
                if (element.esReservado || element.esApartado) {
                    _asientosSeleccionados.push(element)
                }

            });
            asientosSeleccionados.value = _asientosSeleccionados;
        }
    }
}

const apartarAsientos = async () => {
    loading.value = true;
    const asientos = asientosSeleccionados.value
    const data: IAsientoPost[] = [];
    asientos.forEach((e) => {
        let objAsientoPost: IAsientoPost | null = null
        if (e.esReservado) {
            objAsientoPost = {
                asientoId: e.asientoId,
                esAparatado: e.esApartado,
                esReservado: e.esReservado,
                usuarioId: user.value?.usuarioId || 0,
                vueloAsientoId: e.vueloAsientoId,
                vueloId: e.vueloId,
                fechaApartado: null
            }
        } else if (e.esApartado) (
            objAsientoPost = {
                asientoId: e.asientoId,
                esAparatado: e.esApartado,
                esReservado: e.esReservado,
                usuarioId: user.value?.usuarioId || 0,
                vueloAsientoId: e.vueloAsientoId,
                vueloId: e.vueloId,
                fechaApartado: dayjs(new Date).format(),
            }
        )


        if (objAsientoPost && objAsientoPost.usuarioId > 0) {
            data.push(objAsientoPost);
        }
    })

    await useAsiento().apartarAsientos(data);
    mostrarPago.value = false;
    mostrarAsientos.value = false;
    mostrarPrecios.value = false;
    loading.value = false
}

const obtenerTotal = computed(() => {
    const numeAsientos = asientosSeleccionados.value.filter((e) => { return e.esApartado });
    const total = precioPorClase(claseElegida.value) * numeAsientos.length;
    return total
});

const comprar = () => {
    mostrarPago.value = true;
}
const pagar = async () => {
    loading.value = true;
    const asientos = asientosSeleccionados.value
    const data: IAsientoPost[] = [];
    asientos.filter((e) => { return e.esApartado }).forEach((e) => {
        const objAsientoPost: IAsientoPost = {
            asientoId: e.asientoId,
            esAparatado: false,
            esReservado: true,
            usuarioId: user.value?.usuarioId || 0,
            vueloAsientoId: e.vueloAsientoId,
            vueloId: e.vueloId,
            fechaApartado: null
        }


        if (objAsientoPost && objAsientoPost.usuarioId > 0) {
            data.push(objAsientoPost);
        }
    })

    await useAsiento().comprarAsientos(data);
    mostrarPago.value = false;
    mostrarAsientos.value = false;
    mostrarPrecios.value = false;
    numTarjeta.value = "";
    loading.value = false
};
const soloNumeros = (evento: any) => {
    const input = evento.target;
    input.value = input.value.replace(/[^0-9]/g, '');
};
onMounted(async () => {
    await obtenerVuelos();
});

</script>
