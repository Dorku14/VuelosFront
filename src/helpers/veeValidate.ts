import { configure,defineRule } from "vee-validate";
import {localize,setLocale} from "@vee-validate/i18n";
import { required } from "@vee-validate/rules";

defineRule("required",required);

configure({
    generateMessage: localize({
        es:{
            messages:{
                required:"Este campo es requerido"
            }
        }
    })
})


setLocale('es');