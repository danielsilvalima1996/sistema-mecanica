import { OrdensServicos } from './ordens-servicos.model';
import { MaoDeObra } from './mao-de-obra';

export interface OsMaoDeObra {
    id: number,
    quantidade: number,
    total: number,
    idOrdemServico: OrdensServicos,
    idMaoDeObra: MaoDeObra,
    valorUnitario: number,
}