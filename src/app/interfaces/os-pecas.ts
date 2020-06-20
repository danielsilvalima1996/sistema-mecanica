import { OrdensServicos } from './ordens-servicos.model'
import { Pecas } from './pecas'

export interface OsPecas {
    id: number,
    quantidade: number,
    total: number,
    idOrdemServico: OrdensServicos,
    idPecas: Array<Pecas>,
    valorUnitario: number
}