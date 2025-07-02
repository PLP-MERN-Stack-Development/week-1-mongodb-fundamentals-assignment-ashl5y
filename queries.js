db.books.find({genre: 'Fantasy'});

db.books.find({author: 'J.R.R. Tolkien'});

db.books.find({published_year: { $gt: 1950 }});

db.books.updateOne(
  {title: 'Brave New World'},
  {$set: {price: 11.50}}
);

db.books.deleteOne({title: 'The Alchemist'});


db.books.find({
  in_stock: true,
  published_year: {$gt: 2010 }
});

db.books.find({}, {
  _id: 0,
  title: 1,
  author: 1,
  price: 1
});


db.books.find().sort({price: 1});

db.books.find().sort({price: -1});

db.books.find().skip(0).limit(5);

db.books.find().skip(5).limit(5);


db.books.aggregate([
  {
    $group: {
      _id: '$genre',
      averagePrice: {$avg: '$price'}
    }
  }
]);

db.books.aggregate([
  {$group: {_id: '$author', bookCount: {$sum: 1}}},
  {$sort: {bookCount: -1}},
  {$limit: 1}
]);

db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          {$toString: {$subtract: ['$published_year', {$mod: ['$published_year', 10]}]}},
          "s"
        ]
      },
      count: {$sum: 1}
    }
  }
]);


db.books.createIndex({title: 1});

db.books.find({author: 'Jane Austen', published_year: 1945});

db.books.createIndex({author: 1, published_year: 1});


db.books.find({title: 'Pride And Prejudice'}).explain("executionStats");

