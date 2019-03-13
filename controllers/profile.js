function generateProfileDummy(req, res, next) {
  // var user_id = 42;
  // var user_info = user.get_info(user_id);
  // var user_calories;
  // var user_name = "John";

  var user = [
    {
      name: "General",
      id: 0,
      items: [
        {
          name: "Name",
          value: "John Doe"
        },
        {
          name: "Weight",
          value: "160 pounds"
        },
        {
          name: "Age",
          value: 22
        },
        {
          name: "Gender",
          value: "male"
        }
      ]
    },
    {
      name: "Nutritional Information",
      id: 1,
      items: [
        {
          name: "Allergens",
          value: "peanuts and soy"
        },
        {
          name: "Calorie Preference",
          value: "2000"
        }
      ]
    },
    {
      name: "History",
      id: 2,
      items: [
        {
          name: "Previous plans",
          value: "Link to plans"
        }
      ]
    }
  ]

  res.render('profile', {user : user});
}


function generateProfile(req, res, next) {
  // var user_id = 42;
  // var user_info = user.get_info(user_id);
  // var user_calories;
  // var user_name = "John";

  var user = [
    {
      name: "General",
      id: 0,
      items: [
        {
          name: "Name",
          value: req.username
        },
        {
          name: "Weight",
          value: req.weight + " pounds"
        },
        {
          name: "Age",
          value: req.age
        },
        {
          name: "Gender",
          value: "male"
        }
      ]
    },
    {
      name: "Nutritional Information",
      id: 1,
      items: [
        {
          name: "Allergens",
          value: "peanuts and soy"
        },
        {
          name: "Calorie Preference",
          value: "2000"
        }
      ]
    },
    {
      name: "History",
      id: 2,
      items: [
        {
          name: "Previous plans",
          value: "Link to plans"
        }
      ]
    }
  ]

  return user;
}

module.exports = {
    generateProfile, generateProfileDummy
};
