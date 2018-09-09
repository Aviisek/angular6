import { Injectable } from "@angular/core";

import { Recipe } from "./recipes.model";
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

  recipeChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
          'Tasty Schnitzel',
          'A super-tasty Schnitzel - just awesome!',
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
          [
            new Ingredients('Meat', 1),
            new Ingredients('French Fries', 20)
          ]),
        new Recipe('Big Fat Burger',
          'What else you need to say?',
          'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
          [
            new Ingredients('Buns', 2),
            new Ingredients('Meat', 1)
          ])
      ];

      constructor(private shoppingListService: ShoppingListService){}
    
    getRecipes(){
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipeChanged.next(this.recipes.slice());

    }

    getRecipe(index: number){
      return this.recipes[index];
    }
    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredients[]){
        this.shoppingListService.addIngredientsToArray(ingredients);
    }

    deleteRecipe(index: number){
      this.recipes.splice(index,1);
      this.recipeChanged.next(this.recipes.slice());
    }

}