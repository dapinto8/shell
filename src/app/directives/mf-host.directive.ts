import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appMfHost]' })
export class MfHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}