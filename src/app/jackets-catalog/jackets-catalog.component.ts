import { Component, OnInit } from '@angular/core';

interface CartItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-jackets-catalog',
  templateUrl: './jackets-catalog.component.html',
  styleUrls: ['./jackets-catalog.component.css']
})
export class JacketsCatalogComponent implements OnInit {
  cartItems: CartItem[] = [];
  isCartOpen = false;
  checkoutFormVisible = false;
  totalItemsPrice = 0;
  slideIndex = 1;

  ngOnInit(): void {
    this.showSlides(this.slideIndex);
    setInterval(() => this.nextSlide(), 5000);
    this.loadCartItems(); // Загрузка сохранённых товаров из localStorage при инициализации
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity  // Теперь берем количество из переданного объекта
      });
    }

    this.updateCartDisplay();
    this.checkCartIsEmpty();
    this.saveCartItems();

    this.showAddToCartSuccessMessage();

    this.calculateTotalItemsPrice();
  }

  removeFromCart(event: MouseEvent, itemName: string): void {
    const existingItemIndex = this.cartItems.findIndex(item => item.name === itemName);
    if (existingItemIndex !== -1) {
      this.cartItems.splice(existingItemIndex, 1);
    }

    this.updateCartDisplay();
    this.checkCartIsEmpty();
    this.saveCartItems();

    this.calculateTotalItemsPrice();
    event.stopPropagation(); // Остановить всплытие события, чтобы избежать перехода по ссылке
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    this.updateCartDisplay();
    this.calculateTotalItemsPrice();
  }

  checkout(): void {
    this.checkoutFormVisible = true;
  }

  closeCart(): void {
    this.isCartOpen = false;
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  getAsset(path: string): string {
    return `assets/${path}`;
  }

  calculateItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  nextSlide(): void {
    this.slideIndex = (this.slideIndex % 7) + 1;
    this.showSlides(this.slideIndex);
  }

  currentSlide(n: number): void {
    this.slideIndex = n;
    this.showSlides(this.slideIndex);
  }

  showSlides(n: number): void {
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('dot');
    for (let i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.opacity = '0';
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    (slides[n - 1] as HTMLElement).style.opacity = '1';
    dots[n - 1].classList.add('active');
  }

  private updateCartDisplay(): void {
    // Логика для обновления отображения корзины
  }

  private checkCartIsEmpty(): void {
    // Логика для проверки пустоты корзины
  }

  private saveCartItems(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCartItems(): void {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
      this.calculateTotalItemsPrice();
    }
  }

  private showAddToCartSuccessMessage(): void {
    // Логика для показа сообщения о добавлении товара в корзину
  }

  private calculateTotalItemsPrice(): void {
    this.totalItemsPrice = this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
}
