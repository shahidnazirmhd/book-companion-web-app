import {Component, OnInit} from '@angular/core';
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookService} from "../../../../services/services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 4;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllBooksByOwner();
  }

  private findAllBooksByOwner() {
    this.bookService.findAllBooksByOwner({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
      },
      error: (err) => {
        console.log(err);
        // if (err.status as number === 403) {
        //   this.router.navigate(['login'], {queryParams: {tokenExpired: true}});
        // }
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooksByOwner();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooksByOwner();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooksByOwner();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooksByOwner();
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllBooksByOwner();
  }
  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  }

  archiveBook(book: BookResponse) {
    this.bookService.updateBookArchiveStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.archived = !book.archived;
      }
    });
  }

  shareBook(book: BookResponse) {
    this.bookService.updateBookShareableStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    });
  }

  editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id]);
  }
}
