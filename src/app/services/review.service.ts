import { Injectable } from '@angular/core';
import { Review } from '../typings/review.type';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class ReviewService {
  public reviews: Review[] = [
    {
      rating: 5,
      reviewName: 'I love it!',
      review:
        "This product is amazing! I've been using it for a week now and I've already lost 5 pounds!",
    },
    {
      rating: 4,
      reviewName: 'Great product',
      review:
        'I love this product! It has helped me lose weight and I feel great!',
    },
    {
      rating: 3,
      reviewName: 'Good product',
      review:
        'I like this product, but I think it could be better. I would recommend it to a friend.',
    },
    {
      rating: 2,
      reviewName: 'Not so good',
      review:
        'I do not like this product. It has not helped me lose weight and I feel worse.',
    },
    {
      rating: 4,
      reviewName: 'This is just amazing',
      review:
        "I can't believe how much this product has helped me. I feel so much better!",
    },
    {
      rating: 5,
      reviewName: 'Just wow',
      review:
        "How is it possible that this product is so good? I've never seen anything like it!",
    },
    {
      rating: 5,
      reviewName: 'INCREDIBLE',
      review:
        "I owe my life to this product. I've never felt better and I've lost so much weight!",
    },
    {
      rating: 5,
      reviewName: 'I must have this',
      review: 'I need this product in my life. I love it so much!',
    },
    {
      rating: 2,
      reviewName: 'Not so good, but not so bad either',
      review:
        'I like this product, but I think it could be better. I would not really recommend it to a friend. ',
    },
    {
        rating: 3,
        reviewName: 'I don\'t know, but I like it',
        review: 'This product is okay. I don\'t really know what to say about it. The price is good, but I don\'t know if it\'s worth it.',
    },
    {
        rating: 4,
        reviewName: 'I like it, but I don\'t love it',
        review: 'The product is good, but I don\'t think it\'s the best product out there. It has some good features, but it also has some bad ones.',
    },
  ];

  public getRandomReviews(amount: number) {
    const reviews = this.reviews.sort(() => Math.random() - 0.5);
    return reviews.slice(0, amount);
  }
}
