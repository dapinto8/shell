import { loadRemoteModule } from '@angular-architects/module-federation';
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { mfComponents, mfModules } from '../microfrontends';

@Injectable({
  providedIn: 'root'
})
export class MicrofrontendService {
  constructor(private cfr: ComponentFactoryResolver) {}

  async loadAngularComponent(vcr: ViewContainerRef, exposedModule: string) {
    const microfrontend = mfComponents.find(m => m.exposedModule === exposedModule);
    if (!microfrontend) {
      throw new Error(`Microfrontend ${exposedModule} not found`);
    }

    vcr.clear();
    // const { MainComponent } = await import('dashboard/Dashboard');
    const { AppComponent } = await loadRemoteModule(microfrontend);
    vcr.createComponent(this.cfr.resolveComponentFactory(AppComponent));
  }

  async mountModule(vcr: ViewContainerRef, exposedModule: string) {
    const microfrontend = mfModules.find(m => m.exposedModule === exposedModule);
    if (!microfrontend) {
      throw new Error(`Microfrontend ${exposedModule} not found`);
    }

    vcr.clear();
    const { bootstrap } = await loadRemoteModule(microfrontend);
    bootstrap(vcr.element.nativeElement);
  }

  async unmountModule(vcr: ViewContainerRef, exposedModule: string) {
    const microfrontend = mfModules.find(m => m.exposedModule === exposedModule);
    if (!microfrontend) {
      throw new Error(`Microfrontend ${exposedModule} not found`);
    }

    vcr.clear();
    
    const { unmount } = await loadRemoteModule(microfrontend);
    unmount(vcr.element.nativeElement);
  }
}
