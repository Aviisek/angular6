import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';


import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";


@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService){}

    storeRecipes(){
       //const headers = new HttpHeaders().set('Authorization','JWT Token')
       return this.httpClient.put('https://ng-recipe-book-80085.firebaseio.com/recipes.json',this.recipeService.getRecipes(),{
        //observe: 'body',
        //headers: headers
        //params: new HttpParams().set('key',value)
       });
    }

    getRecipes(){
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-80085.firebaseio.com/recipes.json',{
            observe: 'body',
            responseType: 'json'
            //observe: 'response',
            //responseType: 'json'
        })
            .pipe(
                map(
                    (recipes) => {
                        for (let recipe of recipes){
                            if(!recipe['ingredients']){
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                )
            )
            .subscribe(
                (recipes: Recipe[]) => {      
                    this.recipeService.setRecipes(recipes);
                }
            );
     }
}