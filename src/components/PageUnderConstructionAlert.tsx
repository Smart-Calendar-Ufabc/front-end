'use client'

import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FullSection from './template/FullSection'
import { Info } from '@phosphor-icons/react'

const PageUnderConstructionAlert = ({ title }: { title?: string }) => {
  return (
    <FullSection
      sx={{
        minHeight: 'calc(100vh - 120px)',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {title && (
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      )}
      <Card
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          margin: '0 auto',
          py: 2,
          px: 3,
          mt: 3,
          borderLeft: '4px solid ' + theme.palette.primary.main,
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Info size="1.5rem" />
          <Typography variant="subtitle2">NOTA</Typography>
        </Box>
        <Typography>
          Esta seção ainda está em desenvolvimento. Mantenha-se atualizado.
        </Typography>
      </Card>
    </FullSection>
  )
}

export default PageUnderConstructionAlert
