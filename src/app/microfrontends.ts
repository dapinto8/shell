import { LoadRemoteModuleOptions } from '@angular-architects/module-federation';

export const mfComponents: LoadRemoteModuleOptions[] = [
  {
    remoteEntry: 'http://localhost:5100/remoteEntry.js',
    remoteName: 'dashboard',
    exposedModule: './Dashboard'
  },
  {
    remoteEntry: 'http://localhost:5700/remoteEntry.js',
    remoteName: 'store',
    exposedModule: './Store'
  },
];

export const mfModules: LoadRemoteModuleOptions[] = [
  {
    remoteEntry: 'http://localhost:5300/remoteEntry.js',
    remoteName: 'sales',
    exposedModule: './Sales'
  },
  {
    remoteEntry: 'http://localhost:5400/remoteEntry.js',
    remoteName: 'header',
    exposedModule: './Header'
  },
  {
    remoteEntry: 'http://localhost:5500/remoteEntry.js',
    remoteName: 'leftBar',
    exposedModule: './LeftBar'
  },
  {
    remoteEntry: 'http://localhost:5600/remoteEntry.js',
    remoteName: 'rightBar',
    exposedModule: './RightBar'
  }
];
