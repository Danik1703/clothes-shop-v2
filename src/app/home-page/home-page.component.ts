import { Component, OnInit } from '@angular/core';
import { JacketsCatalogComponent } from '../jackets-catalog/jackets-catalog.component';
interface CartItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  slideIndex: number = 1;
  timer: any;
  cartItems: CartItem[] = [];
  cartIsEmpty = true;
  isCartOpen = false;
  showAddToCartSuccess = false;
  checkoutFormVisible = false;
  totalItemsPrice: number = 0;

  ngOnInit() {
    this.loadCartItems();
    this.updateCartDisplay();
    this.checkCartIsEmpty();
    this.startSlider();
    this.calculateTotalItemsPrice();
  }

  startSlider() {
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.slideIndex++;
    if (this.slideIndex > 7) {
      this.slideIndex = 1;
    }
  }

  currentSlide(event: Event, index: number) {
    clearInterval(this.timer);
    this.slideIndex = index;
    this.startSlider();
  }

  addToCart(event: Event, productName: string, productPrice: number, productImage: string) {
    event.preventDefault();
    const existingItem = this.cartItems.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
      });
    }

    this.updateCartDisplay();
    this.checkCartIsEmpty();
    this.saveCartItems();

    this.showAddToCartSuccess = true;
    setTimeout(() => {
      this.showAddToCartSuccess = false;
    }, 3000);

    this.calculateTotalItemsPrice();
  }

  removeFromCart(event: Event, itemName: string) {
    const existingItemIndex = this.cartItems.findIndex(item => item.name === itemName);
    if (existingItemIndex !== -1) {
      this.cartItems.splice(existingItemIndex, 1);
    }

    this.updateCartDisplay();
    this.checkCartIsEmpty();
    this.saveCartItems();

    this.calculateTotalItemsPrice();
  }

  updateCartDisplay() {
    // Можно добавить дополнительную логику для обновления отображения корзины, если необходимо
  }

  checkCartIsEmpty() {
    this.cartIsEmpty = this.cartItems.length === 0;
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  clearCart() {
    this.cartItems = [];
    this.cartIsEmpty = true;
    localStorage.removeItem('cartItems');
    this.updateCartDisplay();
    this.calculateTotalItemsPrice();
  }

  saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  loadCartItems() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
    }
  }

  calculateTotalItemsPrice() {
    this.totalItemsPrice = this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  checkout() {
    this.checkoutFormVisible = true;
  }

  getAsset(path: string): string {
    return `assets${path}`;
  }

  calculateItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }
}