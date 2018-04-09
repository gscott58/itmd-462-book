// Populate Books Collection

use test;
db.authors.drop()
db.bookinstances.drop()
db.books.drop();
db.genres.drop()

db.books.insertOne ({title: 'The Fantastic Four', author: 'Stanley Lee', numPages: 125});
db.books.insertOne ({title: 'The Heroic Trio', author: 'Buster Brown', numPages: 197});
db.books.insertOne ({title: 'War of the Worlds', author: 'H. G. Wells', numPages: 255});
db.books.insertOne ({title: 'The Amazing Spiderman', author: 'Stanley Lee', numPages: 217});
db.books.insertOne ({title: 'The Color Purple', author: 'Whoppie Goldberg', numPages: 254});
db.books.insertOne ({title: 'Crystal Blue Persuasion', author: 'Tommie James', numPages: 45});
db.books.insertOne ({title: 'The Motown Story', author: 'Berry Gordie', numPages: 75});
db.books.insertOne ({title: 'Bread', author: 'David Gates', numPages: 82});
db.books.insertOne ({title: 'Music Theory', author: 'Gregory Scott', numPages: 116});
db.books.find().pretty();

show collections;
