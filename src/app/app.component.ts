import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MicrofrontendService } from './services/microfrontend.service';

const M = 1024 * 1024;
const TEN_SECONDS = 10 * 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'shell';

  @ViewChild('header', { read: ViewContainerRef }) private headerRef!: ViewContainerRef;
  @ViewChild('leftBar', { read: ViewContainerRef }) private leftBarRef!: ViewContainerRef;
  @ViewChild('rightBar', { read: ViewContainerRef }) private rightBarRef!: ViewContainerRef;
  @ViewChild('city', { read: ViewContainerRef }) private cityRef!: ViewContainerRef;
  @ViewChild('sales', { read: ViewContainerRef }) private salesRef!: ViewContainerRef;
  @ViewChild('store', { read: ViewContainerRef }) private storeRef!: ViewContainerRef;

  totalMemory = 0;
  usedMemory = 0;
  usedPercent = 0;
  limitMemory = 0;

  constructor(private mfService: MicrofrontendService, private ngZone: NgZone) {}

  ngOnInit() {
    // this.memoryStats();

    const run = async () => {
      // @ts-ignore
      console.log(performance);
      // const result = await performance.measureUserAgentSpecificMemory();
      // console.log(result);
    }
    run();
  }

  memoryStats() {
    const repeatOften = () => {
      // Do whatever
      if (window.performance) {
        // @ts-ignore
        const memory = window.performance.memory;
        console.log(memory);
        this.totalMemory = Math.round((memory.totalJSHeapSize / M) * 100) / 100;
        this.usedMemory = Math.round((memory.usedJSHeapSize / M) * 100) / 100;
        this.usedPercent = Math.round((this.usedMemory / this.totalMemory) * 100);
        this.limitMemory = Math.round((memory.jsHeapSizeLimit / M) * 100) / 100;
      }
      requestAnimationFrame(repeatOften);
    };
    requestAnimationFrame(repeatOften);
  }

  memory() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        // @ts-ignore
        console.log(performance);
        if (performance) {
          // @ts-ignore
          console.log(window.performance.memory);
          // @ts-ignore
          const memory = window.performance.memory;
          const used = memory.usedJSHeapSize / M;
          const total = memory.totalJSHeapSize / M;
          const usedPercent = Math.round((used / total) * 100);
          console.log(`Used: ${used}MB (${usedPercent}%) of ${total}MB`);
        }
      }, TEN_SECONDS);
    });
  }

  measure() {
    const markerNameA = 'example-marker-a';
    const markerNameB = 'example-marker-b';

    // Run some nested timeouts, and create a PerformanceMark for each.
    performance.mark(markerNameA);
    setTimeout(function () {
      performance.mark(markerNameB);
      setTimeout(function () {
        // Create a variety of measurements.
        performance.measure('measure a to b', markerNameA, markerNameB);
        performance.measure('measure a to now', markerNameA);
        performance.measure('measure from navigation start to b', undefined, markerNameB);
        performance.measure('measure from navigation start to now');

        // Pull out all of the measurements.
        console.log(performance.getEntriesByType('measure'));

        // Finally, clean up the entries.
        performance.clearMarks();
        performance.clearMeasures();
      }, 10000);
    }, 10000);
  }

  ngAfterViewInit() {
    this.mfService.loadAngularComponent(this.cityRef, './Dashboard');
    this.mfService.mountModule(this.headerRef, './Header');
    this.mfService.mountModule(this.leftBarRef, './LeftBar');
    this.mfService.mountModule(this.rightBarRef, './RightBar');

    window.addEventListener('onMount', (event: Event) => {
      const module = (<CustomEvent>event).detail;
      if (module === './Sales') {
        this.mfService.mountModule(this.salesRef, module);
      }
      if (module === './Store') {
        this.mfService.loadAngularComponent(this.storeRef, module);
      }
    });

    window.addEventListener('onUnmount', (event: Event) => {
      const module = (<CustomEvent>event).detail;
      if (module === './Store') {
        this.storeRef.clear();
      } else {
        this.mfService.unmountModule(this.salesRef, module);
      }
    });
  }
}
