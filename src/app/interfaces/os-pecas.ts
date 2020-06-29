import { OrdensServicos } from './ordens-servicos.model'
import { Pecas } from './pecas'

export interface OsPecas {
    id: number,
    valorUnitario: number,
    total: number,
    idPecas: Pecas,
    quantidade: number
}

export interface OsPecasEnvio {
    idPecas: {
        id: number
    },
    quantidade: number
}