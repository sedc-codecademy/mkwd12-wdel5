import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Ingredient } from '../types/enums/ingredients.enum';

// This is a custom directive that is used to highlight the pizza card if it contains chilli peppers
// Directives are used to manipulate the DOM (attach/remove elements and change their properties)
@Directive({
  selector: '[appHotPizza]',
  standalone: true
})
export class HotPizzaDirective {

  // The directive will receive the ingredients as an input same as in a component
  @Input() ingredients: Ingredient[] | undefined = [];

  // These are default parameters in each directive
  constructor(
    // provides direct access to the DOM element associated with the component or directive. 
    // It wraps the native DOM element in a way that you can interact with it using el.nativeElement
    private el: ElementRef,
    // Renderer2 is a service provided by Angular to safely interact with the DOM. 
    // It helps with creating elements, adding or removing classes, setting attributes, or handling styles
    private renderer: Renderer2
  ) { }

  // This will be triggered every time an @Input() property is being changed
  ngOnChanges(): void {
    if (!this.ingredients?.length) {
      return;
    }

    const hasChilliPeppers = this.ingredients.includes(Ingredient.CHILLI_PEPPER);

    if (hasChilliPeppers) {
      // The renderer is used to manipulate the DOM
      this.renderer.setStyle(
        this.el.nativeElement,
        'border',
        '1px solid red'
      )
    }

  }

}
