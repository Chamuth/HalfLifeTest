const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

const Property = require("./models/Property");
const Room = require("./models/Room");
const User = require("./models/User");

const properties = [
  {
    id: "PROP_1",
    title: "Mango Sun",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Quod libero deleniti beatae molestiae necessitatibus,
    corrupti enim modi! Dicta quo aspernatur atque error, omnis
    natus ut totam quisquam maxime earum cupiditate.`,
    // availability: "1/3 rooms available",
    // color: "green-text",
  },
  {
    id: "PROP_2",
    title: "Mango Sea",
    image: "https://cf.bstatic.com/images/hotel/max1024x768/260/260904966.jpg",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Quod libero deleniti beatae molestiae necessitatibus,
    corrupti enim modi! Dicta quo aspernatur atque error, omnis
    natus ut totam quisquam maxime earum cupiditate.`,
    // availability: "3/3 rooms available",
    // color: "green-text",
  },
  {
    id: "PROP_3",
    title: "Mango Hill",
    image:
      "https://www.beautifullife.info/wp-content/uploads/2018/11/05/general.jpg",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Quod libero deleniti beatae molestiae necessitatibus,
    corrupti enim modi! Dicta quo aspernatur atque error, omnis
    natus ut totam quisquam maxime earum cupiditate.`,
    // availability: "Sorry no rooms available",
    // color: "red-text",
  },
];

const rooms = [
  {
    id: "RM_01",
    propertyid: "PROP_1",
    available: true,
    image:
      "http://cdn.home-designing.com/wp-content/uploads/2018/08/modern-platform-bedroom-sets.jpg",
    features: [
      { key: "Floor area", value: "35", color: "green-text" },
      { key: "WiFi", value: "Yes", color: "green-text" },
      { key: "Sea View", value: "Yes", color: "green-text" },
      { key: "Lake View", value: "Yes", color: "green-text" },
      { key: "Mountain View", value: "Yes", color: "green-text" },
      { key: "Bathtub", value: "Yes", color: "green-text" },
      { key: "Balcony", value: "Yes", color: "green-text" },
    ],
  },
  {
    id: "RM_02",
    propertyid: "PROP_1",
    available: true,
    image:
      "http://cdn.home-designing.com/wp-content/uploads/2018/08/modern-platform-bedroom-sets.jpg",
    features: [
      { key: "Floor area", value: "35", color: "green-text" },
      { key: "WiFi", value: "Yes", color: "green-text" },
      { key: "Sea View", value: "Yes", color: "green-text" },
      { key: "Lake View", value: "Yes", color: "green-text" },
      { key: "Mountain View", value: "Yes", color: "green-text" },
      { key: "Bathtub", value: "Yes", color: "green-text" },
      { key: "Balcony", value: "Yes", color: "green-text" },
    ],
  },
  {
    id: "RM_03",
    propertyid: "PROP_1",
    available: true,
    image:
      "http://cdn.home-designing.com/wp-content/uploads/2018/08/modern-platform-bedroom-sets.jpg",
    features: [
      { key: "Floor area", value: "35", color: "green-text" },
      { key: "WiFi", value: "Yes", color: "green-text" },
      { key: "Sea View", value: "Yes", color: "green-text" },
      { key: "Lake View", value: "Yes", color: "green-text" },
      { key: "Mountain View", value: "Yes", color: "green-text" },
      { key: "Bathtub", value: "Yes", color: "green-text" },
      { key: "Balcony", value: "Yes", color: "green-text" },
    ],
  },

  {
    id: "RM_04",
    propertyid: "PROP_2",
    available: true,
    image:
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    features: [
      { key: "Floor area", value: "35", color: "green-text" },
      { key: "WiFi", value: "Yes", color: "green-text" },
      { key: "Sea View", value: "Yes", color: "green-text" },
      { key: "Lake View", value: "Yes", color: "green-text" },
      { key: "Mountain View", value: "Yes", color: "green-text" },
      { key: "Bathtub", value: "Yes", color: "green-text" },
      { key: "Balcony", value: "Yes", color: "green-text" },
    ],
  },
  {
    id: "RM_05",
    propertyid: "PROP_2",
    available: true,
    image:
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    features: [
      { key: "Floor area", value: "35", color: "green-text" },
      { key: "WiFi", value: "Yes", color: "green-text" },
      { key: "Sea View", value: "Yes", color: "green-text" },
      { key: "Lake View", value: "Yes", color: "green-text" },
      { key: "Mountain View", value: "Yes", color: "green-text" },
      { key: "Bathtub", value: "Yes", color: "green-text" },
      { key: "Balcony", value: "Yes", color: "green-text" },
    ],
  },
  {
    id: "RM_06",
    propertyid: "PROP_2",
    available: true,
    image:
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    features: [
      { key: "Floor area", value: "35", color: "green-text" },
      { key: "WiFi", value: "Yes", color: "green-text" },
      { key: "Sea View", value: "Yes", color: "green-text" },
      { key: "Lake View", value: "Yes", color: "green-text" },
      { key: "Mountain View", value: "Yes", color: "green-text" },
      { key: "Bathtub", value: "Yes", color: "green-text" },
      { key: "Balcony", value: "Yes", color: "green-text" },
    ],
  },

  {
    id: "RM_07",
    propertyid: "PROP_3",
    available: true,
    image:
      "http://cdn.home-designing.com/wp-content/uploads/2018/10/Modern-Luxury-Bedroom-With-Black-Wall-And-Geometric-Painting.jpg",
    features: [
      { key: "Floor area", value: "35", color: "green-text" },
      { key: "WiFi", value: "Yes", color: "green-text" },
      { key: "Sea View", value: "Yes", color: "green-text" },
      { key: "Lake View", value: "Yes", color: "green-text" },
      { key: "Mountain View", value: "Yes", color: "green-text" },
      { key: "Bathtub", value: "Yes", color: "green-text" },
      { key: "Balcony", value: "Yes", color: "green-text" },
    ],
  },
  {
    id: "RM_08",
    propertyid: "PROP_3",
    available: true,
    image:
      "http://cdn.home-designing.com/wp-content/uploads/2018/10/Modern-Luxury-Bedroom-With-Black-Wall-And-Geometric-Painting.jpg",
    features: [
      { key: "Floor area", value: "35", color: "green-text" },
      { key: "WiFi", value: "Yes", color: "green-text" },
      { key: "Sea View", value: "Yes", color: "green-text" },
      { key: "Lake View", value: "Yes", color: "green-text" },
      { key: "Mountain View", value: "Yes", color: "green-text" },
      { key: "Bathtub", value: "Yes", color: "green-text" },
      { key: "Balcony", value: "Yes", color: "green-text" },
    ],
  },
  {
    id: "RM_09",
    propertyid: "PROP_3",
    available: true,
    image:
      "http://cdn.home-designing.com/wp-content/uploads/2018/10/Modern-Luxury-Bedroom-With-Black-Wall-And-Geometric-Painting.jpg",
    features: [
      { key: "Floor area", value: "35", color: "green-text" },
      { key: "WiFi", value: "Yes", color: "green-text" },
      { key: "Sea View", value: "Yes", color: "green-text" },
      { key: "Lake View", value: "Yes", color: "green-text" },
      { key: "Mountain View", value: "Yes", color: "green-text" },
      { key: "Bathtub", value: "Yes", color: "green-text" },
      { key: "Balcony", value: "Yes", color: "green-text" },
    ],
  },
];

// populate initial data
// properties.map((prop) => {
//   new Property({
//     id: prop.id,
//     name: prop.title,
//     description: prop.description,
//   }).save();
// });

// rooms.map((room) => {
//   new Room({
//     id: room.id,
//     propertyid: room.propertyid,
//     image: room.image,
//     features: room.features,
//   }).save();
// });

const populate = async () => {
  console.log(await User.find({}));
  console.log(await Property.find({}));
  console.log(await Room.find({}));
  var state = 0;

  properties.forEach((prop) => {
    console.log("Inserting/Updating Property" + prop.id + "...");

    var query = { id: prop.id },
      update = {
        id: prop.id,
        name: prop.title,
        image: prop.image,
        description: prop.description,
      },
      options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      };

    Property.findOneAndUpdate(query, update, options, (er, result) => {
      if (er) console.error(er);
      if (result) console.log("Successfully upserted " + prop.id);
      state++;
    });
  });

  rooms.forEach((room) => {
    console.log("Inserting/Updating Room " + room.id + "...");

    var query = { id: room.id },
      update = {
        id: room.id,
        propertyid: room.propertyid,
        image: room.image,
        features: room.features,
      },
      options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      };

    Room.findOneAndUpdate(query, update, options, (er, result) => {
      if (er) console.error(er);
      if (result) console.log("Successfully upserted " + room.id);
      state++;
    });
  });

  var x = setInterval(() => {
    if (state >= rooms.length + properties.length) {
      clearInterval(x);
      process.exit();
    }
  }, 500);
};

populate();
