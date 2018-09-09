import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;  
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredients;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index: number) =>{
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue(
            {
              name: this.editedItem.name,
              amount: this.editedItem.amount
            }
          );
      }

    );
  }

  onSubmit( form: NgForm){
    const val = form.value;
    const newIngredient = new Ingredients(val.name,val.amount);

    if(this.editMode) {
      this.shoppingListService.updateIngredientsToArray(this.editedItemIndex, newIngredient);
    }else {
      this.shoppingListService.addIngredients(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.shoppingListService.removeFromArray(this.editedItemIndex);
    this.onClear();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
