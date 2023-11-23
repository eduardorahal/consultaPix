Aplicação desenvolvida utilizando NEXT

Após clone do código, comandar 'npm install'

Para rodar a aplicação, 'npm run dev' ou equivalente

Necessário configurar Imagens e Cabeçalho dos relatórios, que utiliza ferramenta PDFMAKE
    IMAGENS:
        Em /public/base64 alterar a logo da PC
    CABEÇALHO
        Nos arquivos contidos em /relatorios/pix => Linhas 95 e 96
        Atenção: Linhas 7 e 8 importam as imagens inseridas em /public/base64. Necessário verificar os nomes dos arquivos. Imagens são utilizadas nas linhas 92 e 99 (relatorio resumido) e 132 e 139 (relatorio detalhado). Necessário verificar os nomes também.

