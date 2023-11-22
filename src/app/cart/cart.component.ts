import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../product.model';
import { CartState, RemoveFromCart, ClearCart } from '../cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
})
export class CartComponent implements OnInit {
  @Select(CartState.getCart) cart$!: Observable<Product[]>;

  constructor(private store: Store) {}

  removeFromCart(productId: number): void {
    this.store.dispatch(new RemoveFromCart(productId));
  }

  getTotalQuantity(): Observable<number> {
    return this.cart$.pipe(map(products => products.reduce((total, p) => total + p.quantity, 0)));
  }

  getTotalPrice(): Observable<number> {
    return this.cart$.pipe(map(products => products.reduce((total, p) => total + p.price * p.quantity, 0)));
  }

  clearCart(): void {
    this.store.dispatch(new ClearCart());
  }

  ngOnInit(): void {
  }
}
