const { app, BrowserWindow, Menu, shell } = require('electron')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

// Garder une référence globale de l'objet window
let mainWindow

function createWindow() {
  // Créer la fenêtre du navigateur
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, '../public/placeholder-logo.png'),
    titleBarStyle: 'default',
    show: false
  })

  // Charger l'application
  if (isDev) {
    // En développement, charger depuis le serveur Next.js
    mainWindow.loadURL('http://localhost:3000')
    // Ouvrir les outils de développement
    mainWindow.webContents.openDevTools()
  } else {
    // En production, charger depuis les fichiers buildés
    mainWindow.loadFile(path.join(__dirname, '../out/index.html'))
  }

  // Afficher la fenêtre quand elle est prête
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Gérer la fermeture de la fenêtre
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Empêcher la navigation vers des sites externes
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

// Créer la fenêtre quand l'app est prête
app.whenReady().then(() => {
  createWindow()

  // Sur macOS, recréer la fenêtre quand l'icône du dock est cliquée
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quitter quand toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Créer le menu de l'application
const template = [
  {
    label: 'Fichier',
    submenu: [
      {
        label: 'Nouveau',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          mainWindow.webContents.send('new-document')
        }
      },
      { type: 'separator' },
      {
        label: 'Quitter',
        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
        click: () => {
          app.quit()
        }
      }
    ]
  },
  {
    label: 'Édition',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },
  {
    label: 'Affichage',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Aide',
    submenu: [
      {
        label: 'À propos de CoachIA',
        click: () => {
          shell.openExternal('https://github.com/kevine628/cluely-fr')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu) 