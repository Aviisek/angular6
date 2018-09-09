import { Subject } from 'rxjs';

import { Ingredients } from '../shared/ingredients.model';


export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredients[]>();
    startedEditing = new Subject<number>();

   private ingredients: Ingredients[] = [
        new Ingredients('Apples', 5),
        new Ingredients('Tomatoes', 10)
      ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredients(ingredient: Ingredients){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredientsToArray(ingredient: Ingredients[]){
        this.ingredients.push(...ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    removeFromArray(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredientsToArray(index: number, newIngredient: Ingredients){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}