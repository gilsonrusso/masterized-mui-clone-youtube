// components/RectDetailsList.tsx
import { Box, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import type { RectShape } from '../types/Shapes' // Assumindo que RectShape está aqui

type RectDetailsListProps = {
  rects: RectShape[]
  imageName?: string
  currentLabel: string
  onHandleCurrentLabel: (value: string) => void
}

export const AppDrawerDetails = ({
  rects,
  imageName,
  currentLabel,
  onHandleCurrentLabel,
}: RectDetailsListProps) => {
  return (
    <Box>
      <Box>
        <TextField
          label="Label do Retângulo"
          variant="outlined"
          value={currentLabel}
          onChange={(e) => onHandleCurrentLabel(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Box>
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          p: 2,
          mt: 2,
          maxHeight: 300,
          overflowY: 'auto',
        }}
      >
        {!rects || rects.length === 0 ? (
          <>
            <Typography variant="body2" color="text.secondary">
              {imageName ? `Nenhum retângulo para ${imageName}.` : 'Nenhum retângulo selecionado.'}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              {imageName ? `Retângulos em: ${imageName}` : 'Retângulos da Imagem Selecionada'}
            </Typography>
            <List dense>
              {rects.map((rect) => (
                <ListItem key={rect.id}>
                  <ListItemText
                    primary={`Label: ${rect.label}`}
                    secondary={`Dimensões: ${rect.width.toFixed(0)}x${rect.height.toFixed(0)} | Posição: (X: ${rect.x.toFixed(0)}, Y: ${rect.y.toFixed(0)})`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Box>
  )
}
