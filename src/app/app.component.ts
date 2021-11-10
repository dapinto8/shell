import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MicrofrontendService } from './services/microfrontend.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'shell';

  @ViewChild('city', {read: ViewContainerRef}) private cityRef!: ViewContainerRef;
  @ViewChild('sales', {read: ViewContainerRef}) private salesRef!: ViewContainerRef;

  constructor(private mfService: MicrofrontendService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mfService.loadAngularComponent(this.cityRef, './Dashboard');

    window.addEventListener('onMount', (event: Event) => {
      const module = (<CustomEvent>event).detail;
      this.mfService.mountModule(this.salesRef, module);
    });

    window.addEventListener('onUnmount', (event: Event) => {
      const module = (<CustomEvent>event).detail;
      this.mfService.unmountModule(this.salesRef, module);
    });
  }


}
