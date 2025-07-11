import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AppsIcon from '@mui/icons-material/Apps'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import WhatShotIcon from '@mui/icons-material/Whatshot'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
  type AppBarProps,
  type BoxProps,
  type IconButtonProps,
  type ListItemTextProps,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import History from '@mui/icons-material/History'
import VideoLibrary from '@mui/icons-material/VideoLibrary'

import AddCircle from '@mui/icons-material/AddCircle'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useEffect, useState } from 'react'
import { UserService } from './services/userServices'
import type { User } from './types/user.types'

const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}))
const IconButtonStyled = styled(IconButton)<IconButtonProps>(() => ({
  // paddingRight:theme.spacing(5),
}))

const AppBarStyled = styled(AppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}))

const ListItemTextStyled = styled(ListItemText)<ListItemTextProps>(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
}))

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  '&.MuiListItem-root': {
    padding: theme.spacing(0),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))

const ICONS_LIST = [
  { icon: <HomeIcon />, text: 'Home' },
  { icon: <WhatShotIcon />, text: 'Trending' },
  { icon: <SubscriptionsIcon />, text: 'Subscriptions' },
]
const ICONS_LIST_2 = [
  { icon: <VideoLibrary />, text: 'Library' },
  { icon: <History />, text: 'History' },
]

const videos = [
  {
    id: 1,
    title: 'FEED DO USUÁRIO | Criando uma Rede Social com React.js e .NET Core #29',
    channel: 'Lucas Nhimi',
    views: '11 mi de visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb1.png',
  },
  {
    id: 2,
    title:
      'COMO MELHORAR SEU CODIGO JAVASCRIPT (ESLINT + PRETTIER + EDITORCONFIG) | Dicas e Truques #02',
    channel: 'Lucas Nhimi',
    views: '957 mil visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb2.png',
  },
  {
    id: 3,
    title: 'CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27',
    channel: 'Lucas Nhimi',
    views: '106 mil visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb3.png',
  },
  {
    id: 4,
    title: 'CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27',
    channel: 'Lucas Nhimi',
    views: '5,6 mi de visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb4.png',
  },
  {
    id: 5,
    title: 'EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26',
    channel: 'Lucas Nhimi',
    views: '2,2 mi de visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb5.png',
  },
  {
    id: 6,
    title: 'COMO MIGRAR PARA REACT HOOKS | Dicas e Truques #01',
    channel: 'Lucas Nhimi',
    views: '233 mil visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb6.png',
  },
  {
    id: 7,
    title: 'PRÉ-REQUISITOS | Criando uma Rede Social com React.js e .NET Core #01',
    channel: 'Lucas Nhimi',
    views: '118 mil visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb7.png',
  },
  {
    id: 8,
    title: 'GIT E GITHUB | Criando uma Rede Social com React.js e .NET Core #04',
    channel: 'Lucas Nhimi',
    views: '1,9 mi de visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb8.png',
  },
  {
    id: 9,
    title: 'GIT E GITHUB | Criando uma Rede Social com React.js e .NET Core #04',
    channel: 'Lucas Nhimi',
    views: '1,9 mi de visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb8.png',
  },
  {
    id: 10,
    title: 'GIT E GITHUB | Criando uma Rede Social com React.js e .NET Core #04',
    channel: 'Lucas Nhimi',
    views: '1,9 mi de visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb8.png',
  },
  {
    id: 11,
    title: 'GIT E GITHUB | Criando uma Rede Social com React.js e .NET Core #04',
    channel: 'Lucas Nhimi',
    views: '1,9 mi de visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb8.png',
  },
  {
    id: 12,
    title: 'GIT E GITHUB | Criando uma Rede Social com React.js e .NET Core #04',
    channel: 'Lucas Nhimi',
    views: '1,9 mi de visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: '/images/thumb8.png',
  },
]

function App() {
  const theme = useTheme()

  const [users, setUsers] = useState<User[]>([])
  const controller = new AbortController()

  async function fetchUsers() {
    try {
      const response = await UserService.getAll(controller.signal)
      setUsers(response)
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'CanceledError') {
        console.warn('Requisição cancelada')
      } else if (error instanceof Error) {
        console.error('Erro geral:', error.message)
      } else {
        console.error('Erro desconhecido:', error)
      }
    }
  }

  useEffect(() => {
    fetchUsers()

    return () => {
      controller.abort()
      // abortManager.abort('getAllUsers')
    }
  }, [])

  console.log('::::::users', users)

  return (
    <BoxStyled>
      <AppBarStyled>
        <Toolbar>
          <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <img
            src={theme.palette.mode === 'dark' ? '/images/branco.png' : '/images/preto.png'}
            alt="logo"
            className="h-7"
          />
          <div className="flex-1" />
          <IconButtonStyled size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <VideoCallIcon />
          </IconButtonStyled>
          <IconButtonStyled size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <AppsIcon />
          </IconButtonStyled>
          <IconButtonStyled size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <MoreVertIcon />
          </IconButtonStyled>
          <Button variant="outlined" color="secondary" startIcon={<AccountCircleIcon />}>
            Fazer Login
          </Button>
        </Toolbar>
      </AppBarStyled>
      <Toolbar />
      <Box display={'flex'}>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Drawer
            sx={{
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <List>
              {ICONS_LIST.map(({ icon: Icon, text }) => (
                <ListItemStyled key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{Icon}</ListItemIcon>
                    <ListItemTextStyled primary={text} />
                  </ListItemButton>
                </ListItemStyled>
              ))}
            </List>
            <Divider />
            <List>
              {ICONS_LIST_2.map(({ icon: Icon, text }) => (
                <ListItemStyled key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{Icon}</ListItemIcon>
                    <ListItemTextStyled primary={text} />
                  </ListItemButton>
                </ListItemStyled>
              ))}
            </List>
            <Divider />
            <Box sx={{ padding: 4 }}>
              <Typography variant="body2">
                Faça login para curtir vídeos, comentar e se inscrever.
              </Typography>
              <Button variant="outlined" color="secondary" startIcon={<AccountCircleIcon />}>
                Fazer Login
              </Button>
            </Box>
            <Divider />
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  O Melhor do youtube
                </ListSubheader>
              }
            >
              <ListItemStyled>
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary={'Música'} />
              </ListItemStyled>
              <ListItemStyled>
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary={'Esportes'} />
              </ListItemStyled>
              <ListItemStyled>
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary={'Jogos'} />
              </ListItemStyled>
              <ListItemStyled>
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary={'Filmes'} />
              </ListItemStyled>
              <ListItemStyled>
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary={'Notícias'} />
              </ListItemStyled>
              <ListItemStyled>
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary={'Ao vivo'} />
              </ListItemStyled>
              <ListItemStyled>
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary={'Destaques'} />
              </ListItemStyled>
              <ListItemStyled>
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary={'Videos 360'} />
              </ListItemStyled>
            </List>
          </Drawer>
        </Box>
        <Box sx={{ paddingX: 4 }}>
          <Toolbar />
          <Typography color="textPrimary" variant="h5" sx={{ padding: 4, fontWeight: 800 }}>
            Recomendados
          </Typography>
          <Grid container spacing={4}>
            {videos.map((item, index) => (
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={index}>
                <Box>
                  <img style={{ width: '100%' }} alt={item.title} src={item.thumb} />
                  <Box>
                    <Typography
                      style={{ fontWeight: 600 }}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {item.title}
                    </Typography>
                    <Typography display="block" variant="body2" color="textSecondary">
                      {item.channel}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {`${item.views} • ${item.date}`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </BoxStyled>
  )
}

export default App
