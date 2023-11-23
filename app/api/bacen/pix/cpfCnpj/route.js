import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    let lista = [];
    let cpfCnpj = searchParams.get('cpfCnpj');
    let motivo = searchParams.get('motivo');
    var credentials = btoa(process.env.usernameBC + ':' + process.env.passwordBC);
    var basicAuth = 'Basic ' + credentials;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://www3.bcb.gov.br/bc_ccs/rest/consultar-vinculos-pix?cpfCnpj=' + cpfCnpj + '&motivo=' + motivo,
        headers: {
            'Accept': 'application/json',
            'Authorization': basicAuth,
        }
    };

    const vinculos = await axios.request(config)
        .then(res1 => res1.data.vinculosPix)
        .then(async (chaves) => {
            if (chaves.length > 0) {

                // Ordena as chaves PIX recebidas para que as primeiras contenham CPF e Nome, preferencialmente

                await chaves.sort((a, b) => a.cpfCnpj && a.nomeProprietario ? -1 : (a.cpfCnpj ? -1 : 1))

                // Replica as informações de CPF e Nome para as demais chaves que não tenham tais informações

                let nomeProprietarioBusca = chaves[0].nomeProprietario;
                let cpfCnpjBusca = cpfCnpj;

                for await (let chave of chaves) {
                    await axios.get('https://www3.bcb.gov.br/informes/rest/pessoasJuridicas?cnpj=' + chave.participante)
                        .then(response => response.data)
                        .then((participante) => {
                            chave.numerobanco = (participante.codigoCompensacao ? participante.codigoCompensacao.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false }) : '000');
                            chave.nomebanco = participante.nome;
                            chave.cpfCnpjBusca = cpfCnpjBusca;
                            chave.nomeProprietarioBusca = nomeProprietarioBusca;
                        })
                        .catch((err) => {
                            chave.numerobanco = "000";
                            chave.nomebanco = "BANCO NÃO INFORMADO";
                            chave.cpfCnpjBusca = cpfCnpjBusca;
                            chave.nomeProprietarioBusca = nomeProprietarioBusca;
                        })
                    for await (let evento of chave.eventosVinculo) {
                        await axios.get('https://www3.bcb.gov.br/informes/rest/pessoasJuridicas?cnpj=' + evento.participante)
                            .then(response => response.data)
                            .then((participante) => {
                                evento.numerobanco = (participante.codigoCompensacao ? participante.codigoCompensacao.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false }) : '000');
                                evento.nomebanco = participante.nome
                            })
                            .catch((err) => {
                                evento.numerobanco = "000";
                                evento.nomebanco = "BANCO NÃO INFORMADO"
                            })
                    }
                    if (chave.status == null) {
                        chave.status = 'INATIVO'
                    }
                }
                lista.push(chaves)
            } else {
                lista.push(chaves)
            }
        })
        .catch((error) => {
            lista.push(error.response.data.message)
        })

    return NextResponse.json(lista)
}