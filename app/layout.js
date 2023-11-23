import { Inter } from 'next/font/google'
import './globals.css'
import { Box } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Consulta PIX',
  description: 'Laboratório de Tecnologia Contra Lavagem de Dinheiro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box paddingTop={10} paddingLeft={2} >
          {children}
        </Box>
      </body>
    </html>
  )
}
