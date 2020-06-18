export interface OsMaoDeObraEnvio {
    qtd: number,
    idOrdensServico: number,
    idMaoDeObra: number
}

export interface OsMaoDeObraRetorno {
    id: number,
    descricao: string,
    valorUnitario: number,
    active: boolean
}