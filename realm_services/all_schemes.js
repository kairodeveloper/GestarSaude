export const RealmSchema = [
    {
        name: 'Usuario',
        primaryKey: 'mid',
        properties: {
            mid: { type: 'int', indexed: true },
            nome: { type: 'string', default: '' },
            idade: { type: 'int', default: 0},
            cep: { type: 'string', default: '' },
            bairro: { type: 'string', default: '' },
            logradouro: { type: 'string', default: '' },
            num_casa: { type: 'string', default: '' },
            cartao_sus: { type: 'string', default: '' },
            createdAt: { type: 'date', default: Date() },
            removido: { type: 'bool', default: false }
        }
    },
    {
        name: 'Gravidez',
        primaryKey: 'mid',
        properties: {
            mid: { type: 'int', indexed: true },
            semana: { type: 'int', default: 0 },
            peso: { type: 'double', default: 0 },
            nome_bebe: { type: 'string', default: '' },
            sexo_bebe: { type: 'bool', default: false},
            createdAt: { type: 'date', default: Date() },
            removido: { type: 'bool', default: false }
        }
    },
    {
        name: 'Exame',
        primaryKey: 'mid',
        properties: {
            mid: { type: 'int', indexed: true },
            nome: { type: 'string', default: "" },
            trimestre: { type: 'int', default: 0 },
            feito: { type: 'bool', default: false },
            createdAt: { type: 'date', default: Date() },
            removido: { type: 'bool', default: false }
        }
    },
    {
        name: 'Consulta',
        primaryKey: 'mid',
        properties: {
            mid: { type: 'int', indexed: true },
            numero: { type: 'int', default: 0 },
            estado: { type: 'int', default: 0 },
            nome_medico: { type: 'string', default: "" },
            data: { type: 'date', default: Date() },
            peso: { type: 'double', default: 0 },
            pressao_x: { type: 'int', default: 0 },
            pressao_y: { type: 'int', default: 0 },
            observacao: { type: 'string', default: "" },
            createdAt: { type: 'date', default: Date() },
            removido: { type: 'bool', default: false }
        }
    }
]
