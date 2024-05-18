import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { RatingComponent } from './components/rating/rating.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import {FormsModule} from "@angular/forms";
import { BorrowedBooksComponent } from './pages/borrowed-books/borrowed-books.component';
import { MyReturnedBooksComponent } from './pages/my-returned-books/my-returned-books.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    BookListComponent,
    BookCardComponent,
    RatingComponent,
    MyBooksComponent,
    ManageBookComponent,
    BorrowedBooksComponent,
    MyReturnedBooksComponent
  ],
    imports: [
        CommonModule,
        BookRoutingModule,
        FormsModule
    ]
})
export class BookModule { }
