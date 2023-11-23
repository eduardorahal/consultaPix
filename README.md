Consulta PIX desenvolvida no Laboratório de Tecnologia Contra Lavagem de Dinheiro da Polícia Civil de Santa Catarina.
Desenvolvedor: Agente de Polícia Eduardo Rahal (eduardo-rahal@pc.sc.gov.br)
Coordenador: Delegado de Polícia Rodrigo Schneider (rodrigo-schneider@pc.sc.gov.br)

O uso é restrito às Polícias Judiciárias e demais órgãos cadastradas junto ao Banco Central para efetuar tais consultas.
Este código não deve ser compartilhado para além deste público alvo.

INSTRUÇÕES PARA INSTALAÇÃO E EXECUÇÃO:

Aplicação desenvolvida utilizando NEXT JS 13 E REACT.

1. Após clone do código, comandar 'npm install'

2. Para rodar a aplicação, 'npm run dev' ou equivalente

3. Necessário configurar Imagens e Cabeçalho dos relatórios, que utiliza ferramenta PDFMAKE
   
    IMAGENS:
        Em /public/base64 alterar a logo da PC
   
    CABEÇALHO
        Nos arquivos contidos em /relatorios/pix => Linhas 95 e 96
        Atenção: Linhas 7 e 8 importam as imagens inseridas em /public/base64. Necessário verificar os nomes dos arquivos. Imagens são utilizadas nas linhas 92 e 99 (relatorio resumido) e 132 e 139 (relatorio detalhado). Necessário verificar os nomes também.

4. Configurar as variáveis de ambiente em 'next.config.js': usernameBC e passwordBC, com as credenciais fornecidas pelo BACEN
