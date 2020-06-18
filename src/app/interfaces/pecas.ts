export interface OsPecasEnvio {
    qtd: number,
    idOrdensServico: number,
    idPecas: number
}

export interface PecasRetorno {
    id: number,
    marca: string,
    modelo: string,
    descricao: string,
    valorUnitario: number,
    active: boolean
}