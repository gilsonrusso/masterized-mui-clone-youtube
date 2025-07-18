import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { ImageWithRects } from '../types/Shapes'
import { AppDrawer } from './AppDrawer'
import { AppDrawerDetails } from './AppDrawerDetails'

export const AppDrawerContainer = () => {
  const [currentLabel, setCurrentLabel] = useState<string>('')
  const [images, setImages] = useState<ImageWithRects[]>([])
  const [selectedImage, setSelectedImage] = useState<ImageWithRects | null>(null)

  const appDrawerExportRef = useRef<(() => void) | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    files.forEach((file) => {
      const id = uuidv4()
      const img = new window.Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        const newImage: ImageWithRects = { id, image: img, rects: [] }
        setImages((prev) => [...prev, newImage])
        // Ao carregar uma nova imagem, selecione-a automaticamente
        setSelectedImage(newImage)
      }
      img.onerror = (err) => {
        console.error('Erro ao carregar a imagem:', err)
        alert('Não foi possível carregar a imagem.')
      }
    })
  }

  // A função onExportClick agora chamará a função exposta pelo AppDrawer
  const onExportClick = () => {
    if (appDrawerExportRef.current) {
      appDrawerExportRef.current() // Chama a função de exportação do AppDrawer
    } else {
      alert('Nenhuma imagem para exportar ou o AppDrawer não está pronto.')
    }
  }

  // Função que o AppDrawer chamará para atualizar os retângulos de uma imagem
  const handleUpdateImageRects = (updatedImage: ImageWithRects) => {
    setImages((prevImages) =>
      prevImages.map((img) => (img.id === updatedImage.id ? updatedImage : img))
    )
    // É crucial atualizar o selectedImage aqui para que o AppDrawer re-renderize
    // com os novos retângulos, já que selectedImage é uma prop para ele.
    if (selectedImage && selectedImage.id === updatedImage.id) {
      setSelectedImage(updatedImage)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Minha Aplicação de Anotação de Imagens
      </Typography>
      {/* Seção de Upload de Imagens */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="image-upload-input"
          />
          <label htmlFor="image-upload-input">
            <Button variant="contained" component="span">
              Carregar Imagens
            </Button>
          </label>
        </Grid>
        <Grid>
          <Typography variant="body1" color="text.secondary">
            {images.length > 0
              ? `${images.length} imagem(ns) carregada(s).`
              : 'Nenhuma imagem carregada.'}
          </Typography>
        </Grid>
        <Grid>
          {/* Adicionei botão de exportar aqui */}
          <Button
            onClick={onExportClick}
            variant="contained"
            color="primary"
            disabled={!selectedImage} // Desabilita se não houver imagem selecionada
          >
            Exportar Imagem Atual
          </Button>
        </Grid>
      </Grid>

      {/* Miniaturas das Imagens Carregadas para Seleção */}
      <Grid container spacing={1} columns={12} sx={{ marginY: 2 }}>
        {images.map((imgItem) => (
          <>
            <Grid>
              <img
                src={imgItem.image.src}
                alt={`img-${imgItem.id}`}
                width={'100%'}
                onClick={() => setSelectedImage(imgItem)}
                style={{
                  cursor: 'pointer',
                  border: selectedImage?.id === imgItem.id ? '2px solid blue' : '1px solid gray',
                }}
              />
            </Grid>
          </>
        ))}
      </Grid>

      {/* <Grid>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Grid container spacing={5}>
            <Grid size={12}>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
            </Grid>
            <Grid size={12}>
              <Button
                onClick={() => onExportClick()}
                variant="contained"
                color="primary"
                endIcon={<DownloadOutlined />}
              >
                Export
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={1} columns={12} sx={{ marginY: 2 }}>
          {images.map((el, index) => (
            <Grid key={index} size={1}>
              <img
                src={el.image.src}
                alt={`img-${index}`}
                width={'100%'}
                onClick={() => setSelectedImage(el)} // Passa o objeto completo da imagem
                style={{
                  cursor: 'pointer',
                  border: selectedImage?.id === el.id ? '2px solid blue' : '1px solid gray', // Compare pelo ID
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid> */}

      <TextField
        label="Label do Retângulo"
        variant="outlined"
        value={currentLabel}
        onChange={(e) => setCurrentLabel(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        disabled={!selectedImage} // Desabilita se não houver imagem selecionada
      />

      <Grid container spacing={4} direction="row">
        <Grid size={4}>
          <AppDrawerDetails
            rects={selectedImage ? selectedImage.rects : []}
            currentLabel={currentLabel}
            onHandleCurrentLabel={setCurrentLabel}
            imageName={selectedImage?.image.src.split('/').pop()}
          />
        </Grid>
        <Grid size={8}>
          <AppDrawer
            selectedImage={selectedImage}
            onUpdateImageRects={handleUpdateImageRects}
            currentLabel={currentLabel}
            onSetCurrentLabel={setCurrentLabel}
            // Passe a ref para o AppDrawer expor a função de exportação
            onSetExportFunction={(exportFn) => {
              appDrawerExportRef.current = exportFn
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
