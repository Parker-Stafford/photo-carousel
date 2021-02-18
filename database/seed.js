// write my data creator here
const express = require('express');
// const mongoose = require('mongoose');
const faker = require('faker');
const db = require('./mongo.js');

// random number between two values
var getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

var makeRandomRating = () => {
  var num = getRandomNum(3, 6);
  if (num === 5) {
    return num;
  } else {
    var dec1 = getRandomNum(1, 10);
    var dec2 = getRandomNum(1, 10);

    var rating = Number(num + '.' + dec1 + dec2);
    return rating;
  }
};
// =========== arrays that will hold dummy data to generate random data objects ============

// write an array of listing names
var names = ['Cabin in the woods', 'Grandma\'s cozy cottage', 'Mountain escape', 'Hut on a hill', 'Forest-side cabin', 'Luxurious time away in the woods', 'Crazy mountain container casa', '"The Burrow"', 'Beautiful Home in Scenic Area', 'Lovely Vacation Home in the Great Outdoors', 'Smokey\'s Sleepy Cave', 'The Lodge', 'Glamping is Happiness Home', 'Secluded Private Wilderness Home'];

// write an array of photo urls and descriptions
var photos = [
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/031dcb9df9b7f59febe978bf8ccdcc3d.jpg', description: 'Cozy common space', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/08cd1c223709821d4833dd004e4d35e2-p_e.jpg', description: 'Comfortable queen bed with functional heater', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/1_p1zBnv11CSx_EII8sB9Uaw.jpeg', description: 'Entryway to the cabin', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/1407953244000-177513283.jpg', description: 'Backyard seating area for large groups', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/27514080792_6371181022_o.0.jpg', description: 'Outdoor firepit', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/42beb0625d2c8673ce3d8317d495454b.jpg', description: 'Cabin in the fall', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/960x0.jpg', description: 'Snowy season jacuzzi', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/969ae4bb-efd1-4fb9-a4e3-5cb3316dd3c9.jpg', description: 'Open kitchen and dining space', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Airbnb-rental-tips.-Hostmaker-1-620x349.jpg', description: 'Double full beds', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/airbnb-tips-greenwich-village-apt.jpg', description: 'Kitchen leading into the back yard', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/amish-prefab-cabins-and-log-home-for-sale.jpg', description: 'Master bedroom with queen bed', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/blueground-apartment-2-2-2.jpg', description: 'Upper level deck', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/d062d4a3c20ed27f4a8bf843a449dc68.jpg', description: 'Covered rec area', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/d55b10d433b07982c487b40d9e27420f.jpg', description: 'Spatious gathering area with fireplace', photoId: null },
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/detail-EXP-header.jpg', description: 'Lakeside relaxation', photoId: null },
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Donnas-Premier-Lodging-Cabin-Google.jpg', description: 'View of the lodge from the lake - boats available', photoId: null },
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/fecc83ebe360dcf44233210ebf29f958.jpg', description: 'Working fireplace in living space', photoId: null },
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/harman-s-luxury-log-cabins.jpg', description: 'Quaint cabin tucked away in the woods', photoId: null },
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/log-cabin-master-result-standard.jpg', description: 'Stocked kitchen with gas range', photoId: null},
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Log-Cabin-Homes-Stunning-Log-Cabin.jpg', description: 'Relax on the docks', photoId: null },
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/log-cabin-master-result-standard.jpg', description: 'Lower level and loft', photoId: null },
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Modular-Cabin3-scaled.jpg', description: 'Spend the day here with the whole family', photoId: null },
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Villa-Homes-Photos-by-Chris-web-2.jpg', description: 'The Cabin', photoId: null },
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Winchester-Homes-uncategorized-2710.jpg', description: 'Fun outdoor area', photoId: null },
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Winchester-Homes-uncategorized-2710.jpg', description: 'Wrap-around deck', photoId: null },
  { url: 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Winchester-Homes-uncategorized-2710.jpg', description: 'Outdoor seating', photoId: null }
];

// write a function that will pull about 8-15 photos and put them in an array
var randomPhotoGrouper = (x) => {
  // create a result array of photos and descriptions
  var photoGroup = [];
  var i = 0;
  // var id = 1;
  while (i < x) {
    var index = getRandomNum(0, photos.length);
    var photoObj = photos[index];
    // photoObj.photoId = id;
    photoGroup.push(photoObj);
    i++;
    // id++;
  }
  return photoGroup;
};



// need to write function(s) that will build 100 data objects
var listingMaker = (max) => {
  var data = [];
  var x = 1;

  while (x <= max) {
    // this will push a single data object
    data.push({
      // all of the information matching the schema's framework
      sharedId: x,
      name: names[getRandomNum(0, names.length)],
      rating: makeRandomRating(),
      reviews: getRandomNum(4, 80), // needs a random number
      location: faker.address.city() + ', ' + faker.address.state() + ', ' + faker.address.country(),
      photos: randomPhotoGrouper(getRandomNum(7, 14))

    });
    x++;
  }

  // return data with all of the listings
  return data;
};

var listings = listingMaker(100);

//  Listing.insertMany(data) -- will
db.saveMany(listings);