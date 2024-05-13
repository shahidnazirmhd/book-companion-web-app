package in.snm.bookcompanion.book;

import in.snm.bookcompanion.file.FileUtils;
import in.snm.bookcompanion.history.BookTransactionHistory;
import org.springframework.stereotype.Service;

@Service
public class BookMapper {


    public Book toBook(BookRequest bookRequest) {
    return Book.builder()
        .id(bookRequest.id())
        .title(bookRequest.title())
        .authorName(bookRequest.authorName())
        .isbn(bookRequest.isbn())
        .synopsis(bookRequest.synopsis())
        .archived(false)
        .shareable(bookRequest.shareable())
        .build();
    }

    public BookResponse toBookResponse(Book book) {
    return BookResponse.builder()
            .id(book.getId())
            .title(book.getTitle())
            .authorName(book.getAuthorName())
            .isbn(book.getIsbn())
            .synopsis(book.getSynopsis())
            .rate(book.getRate())
            .archived(book.isArchived())
            .shareable(book.isShareable())
            .owner(book.getOwner().getFullName())
            .cover(FileUtils.readFileFromLocation(book.getBookCover()))
            .build();
    }

    public BookTransactionResponse toBookTransactionResponse(BookTransactionHistory history) {
        return BookTransactionResponse.builder()
                .id(history.getBook().getId())
                .title(history.getBook().getTitle())
                .authorName(history.getBook().getAuthorName())
                .isbn(history.getBook().getIsbn())
                .rate(history.getBook().getRate())
                .returned(history.isReturned())
                .returnApproved(history.isReturnApproved())
                .build();
    }
}
