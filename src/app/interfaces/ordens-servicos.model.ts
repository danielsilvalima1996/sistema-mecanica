import { Veiculo } from './veiculo.model';
import { OsMaoDeObra } from './os-mao-de-obra';
import { OsPecas } from './os-pecas';
import { Users } from './users.model';

export interface OrdensServicos {
    id: number,
    entrada: Date,
    saida: Date,
    nomeCliente: string,
    cpfCnpj: string,
    ddd: string,
    telefone: string,
    observacoes: string,
    idVeiculo: Veiculo | null,
    placa: string,
    idOsMaoDeObra: Array<OsMaoDeObra> | null,
    totalOsMaoDeObra: number,
    idOsPecas: Array<OsPecas> | null,
    totalOsPecas: number,
    totalServico: number,
    idUsuario: Users | null,
    isFinalizado: number
}

export interface OrdensServicosAdd {
    nomeCliente: string,
    cpfCnpj: string,
    ddd: string,
    telefone: string,
    observacoes: string,
    idVeiculo: {
        id: number
    }
    idUsuario: {
        id: number
    },
    placa: string
}