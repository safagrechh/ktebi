package com.symatique.ktebi.book;

import com.symatique.ktebi.feedback.Feedback;
import com.symatique.ktebi.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Book {
    @Id
    @GeneratedValue
    private Long id ;
    private String title ;
    private String authorName ;
    private String isbn;
    private String synopsis ;
    private String bookCover ;
    private boolean archived ;
    private boolean shareable ;
   @CreatedDate
   @Column(nullable = false , updatable = false)
   private LocalDateTime createdDate ;
   @LastModifiedDate
   @Column(insertable = false)
   private LocalDateTime lastModifiedDate ;
    @CreatedBy
    @Column(nullable = false , updatable = false)
    private Long createdBy ;

    @LastModifiedBy
    @Column(insertable = false)
    private Long lastModifiedBy ;

    // relations

    @ManyToOne
    @JoinColumn(name="owner_id")
    private User owner ;
    @OneToMany(mappedBy = "book")
    private List<Feedback> feedbacks ;

    @OneToMany(mappedBy = "book")
    private List<BookTransactionHistory> histories ;

    @Transient
    public double getRate() {
        if (feedbacks == null || feedbacks.isEmpty()) {
            return 0.0;
        }
        var rate = this.feedbacks.stream()
                .mapToDouble(Feedback::getNote)
                .average()
                .orElse(0.0);
        double roundedRate = Math.round(rate * 10.0) / 10.0;

        // Return 4.0 if roundedRate is less than 4.5, otherwise return 4.5
        return roundedRate;
    }



}
