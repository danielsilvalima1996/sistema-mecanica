import { OrdensServicos } from './ordens-servicos.model';
import { MaoDeObra } from './mao-de-obra';

export interface OsMaoDeObra {
    id: number,
    quantidade: number,
    total: number,
    idMaoDeObra: MaoDeObra
}

export interface OsMaoDeObraEnvio {
    idMaoDeObra: {
        id: number
    },
    quantidade: number
}