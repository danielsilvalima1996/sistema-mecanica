import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() { }

    getParameters(json) {
        return Object.keys(json).map((key) => {
            if (json[key] === undefined || json[key] === null) {
                json[key] = '';
            }
            return `${key}=${json[key]}`;
        }).join('&');
    }

    /* Formato esperado 12345678901 */

    cpf(cpf: string): boolean {
        if (cpf == null) {
            return false;
        }
        if (cpf.length != 11) {
            return false;
        }
        if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
            return false;
        }
        let numero: number = 0;
        let caracter: string = '';
        let numeros: string = '0123456789';
        let j: number = 10;
        let somatorio: number = 0;
        let resto: number = 0;
        let digito1: number = 0;
        let digito2: number = 0;
        let cpfAux: string = '';
        cpfAux = cpf.substring(0, 9);
        for (let i: number = 0; i < 9; i++) {
            caracter = cpfAux.charAt(i);
            if (numeros.search(caracter) == -1) {
                return false;
            }
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito1 = 11 - resto;
        if (digito1 > 9) {
            digito1 = 0;
        }
        j = 11;
        somatorio = 0;
        cpfAux = cpfAux + digito1;
        for (let i: number = 0; i < 10; i++) {
            caracter = cpfAux.charAt(i);
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito2 = 11 - resto;
        if (digito2 > 9) {
            digito2 = 0;
        }
        cpfAux = cpfAux + digito2;
        if (cpf != cpfAux) {
            return false;
        }
        else {
            return true;
        }
    }

    /**
 *
 * @param windowHeight innerHeight
 * @param percent valor em percentual para calcular o tamanho da tela
 */
    calcularHeight(windowHeight: number, percent: number) {
        windowHeight = innerHeight;
        windowHeight = windowHeight * percent;
        return windowHeight;
    }

    /**
 * 
 * @param telefone recebe uma string com número de telefone ou celular
 * @returns uma string formatada utilizando como paramêtro o length da string
 */
    mascaraDeTelefone(telefone) {
        const textoAtual = telefone;
        const isCelular = textoAtual.length === 9;
        let teleCel;
        if (isCelular) {
            teleCel = textoAtual.replace(/(\d{5})(\d{4})/,
                function (regex, arg1, arg2) {
                    return arg1 + '-' + arg2;
                });
        } else {
            const parte1 = textoAtual.slice(0, 4);
            const parte2 = textoAtual.slice(4, 8);
            teleCel = `${parte1}-${parte2}`
        }
        return teleCel;
    }

    /**
     * 
     * @param campoTexto Recebe uma string com o CPF ou CNPJ
     * ela verifica se é CNPJ ou CPF, e chama a respectiva função que formata
     * @returns uma string formatada
     */
    formatarCnpjCpf(campoTexto: string) {
        if (campoTexto.length <= 11) {
            campoTexto = this.mascaraCpf(campoTexto);
        } else {
            campoTexto = this.mascaraCnpj(campoTexto);
        }
        return campoTexto;
    }


    /**
 * 
 * @param valor recebe CPF, somente números
 * @returns uma string formatada em CPF
 */
    private mascaraCpf(valor: string) {
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    }

    /**
     * 
     * @param valor recebe CPF, somente números
     * @returns uma string formatada em CNPJ
     */
    private mascaraCnpj(valor: string) {
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }


}
