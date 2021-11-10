import { LoadRemoteModuleOptions } from '@angular-architects/module-federation';

export const mfComponents: LoadRemoteModuleOptions[] = [
  {
    remoteEntry: 'http://localhost:5100/remoteEntry.js',
    remoteName: 'dashboard',
    exposedModule: './Dashboard'
  }
];

export const mfModules: LoadRemoteModuleOptions[] = [
  {
    remoteEntry: 'http://localhost:5300/remoteEntry.js',
    remoteName: 'sales',
    exposedModule: './Sales'
  }
];
