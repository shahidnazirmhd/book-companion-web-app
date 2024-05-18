import {Component, OnInit} from '@angular/core';
import {PageResponseBookTransactionResponse} from "../../../../services/models/page-response-book-transaction-response";
import {BookTransactionResponse} from "../../../../services/models/book-transaction-response";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {FeedbackService} from "../../../../services/services/feedback.service";

@Component({
  selector: 'app-my-returned-books',
  templateUrl: './my-returned-books.component.html',
  styleUrl: './my-returned-books.component.scss'
})
export class MyReturnedBooksComponent implements OnInit{

  returnedBooks: PageResponseBookTransactionResponse = {};
  page = 0;
  size = 8;
  message = '';
  level = 'success';

  constructor(
    private bookService: BookService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.returnedBooks = resp;
      },
      error: (err) => {
        console.log(err);
        if (err.status as number === 403) {
          this.router.navigate(['login'], {queryParams: {tokenExpired: true}});
        }
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page = this.returnedBooks.totalPages as number - 1;
    this.findAllReturnedBooks();
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllReturnedBooks();
  }
  get isLastPage(): boolean {
    return this.page == this.returnedBooks.totalPages as number - 1;
  }

  approveBookReturn(book: BookTransactionResponse) {
    if (!book.returned) {
      this.level = 'error';
      this.message = 'The book is not yet returned';
      return;
    }
    this.message = '';
    this.bookService.approveReturnBorrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = "Book return approved";
        this.findAllReturnedBooks();
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        if(err.error.errorDescription) {
          this.message = err.error.errorDescription;
        } else {
          this.message = err.error.error;
        }
      }
    });
  }
}
