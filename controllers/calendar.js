var url = require('url');

function calendar(req, res, next) {
  var week = [
    {
      name: 'Monday',
      id: 1,
      meals: [
        {
          name: "Breakfast",
          id: 1,
          recipes: [
            {
              id:1,
              name: "Banana-strawberry smoothie",
              link: "https://www.gimmesomeoven.com/strawberry-banana-smoothie-recipe/",
              ingredients: [
                {
                  name: "Banana",
                  qty: "1"
                },
                {
                  name: "Strawberry",
                  qty: "5"
                }
              ]
            },
            {
              id:2,
              name: "Plain yoghurt",
              ingredients: [
                {
                  name: "Yoghurt",
                  qty: "1oz"
                }
              ]
            },
            {
              id:3,
              name: "Coffee with sugar",
              ingredients: [
                {
                  name: "Coffee",
                  qty: "1 cup"
                },
                {
                  name: "Sugar",
                  qty: "1 tbsp"
                }
              ]
            }
          ],
          eaten: true
        },
        {
          name: "Lunch",
          id: 2,
          recipes: [
            {
              id:4,
              name: "Omelette",
              link: "https://www.gimmesomeoven.com/everyday-salad-recipe/",
              ingredients: [
                {
                  name: "Eggs",
                  qty: "3"
                },
                {
                  name: "Salt",
                  qty: "1tbsp"
                },
                {
                  name: "Oil",
                  qty: "1tbsp"
                },
                {
                  name: "Pepper",
                  qty: "1tbsp"
                }
              ]
            },
            {
              id:5,
              name: "Plain yoghurt",
              ingredients: [
                {
                  name: "Yoghurt",
                  qty: "1oz"
                }
              ]
            }
          ],
          eaten: true
        },
        {
          name: "Dinner",
          id: 3,
          recipes: [
            {
              id: 6,
              name: "Salad",
              link: "https://www.gimmesomeoven.com/everyday-salad-recipe/",
              ingredients: [
                {
                  name: "Tomato",
                  qty: "2"
                },
                {
                  name: "Cucumber",
                  qty: "1/2"
                },
                {
                  name: "Olive oil",
                  qty: "1tbsp"
                }
              ]
            },
            {
              id: 7,
              name: "Pasta with chicken",
              link: "https://www.gimmesomeoven.com/everyday-salad-recipe/",
              ingredients: [
                {
                  name: "Pasta",
                  qty: "4oz"
                },
                {
                  name: "Chicken",
                  qty: "3oz"
                },
                {
                  name: "Oil",
                  qty: "1tbsp"
                },
                {
                  name: "Parmesan",
                  qty: "1oz"
                }
              ]
            },
            {
              id: 8,
              name: "Apple",
              ingredients: [
                {
                  name: "Apple",
                  qty: "1"
                }]
            },
            {
              id: 9,
              name: "Banana",
              ingredients: [
                {
                    name: "Banana",
                    qty: "1"
                }
              ]
            }
          ],
          active: true
        }
      ]
    },
    {
      name: 'Tuesday',
      id: 2,
      meals: [
        {
          name: "Breakfast",
          id: 4,
          recipes: [
            {
              id:10,
              name: "Banana-strawberry smoothie",
              link: "https://www.gimmesomeoven.com/strawberry-banana-smoothie-recipe/",
              ingredients: [
                {
                  name: "Banana",
                  qty: "1"
                },
                {
                  name: "Strawberry",
                  qty: "2oz"
                }
              ]
            },
            {
              id:11,
              name: "Plain yoghurt",
              ingredients: [
                {
                  name: "Yoghurt",
                  qty: "1oz"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  var queryData = url.parse(req.url, true).query;
  if (queryData.eaten) {
    week[0].meals[2].eaten = true;
    week[1].meals[0].active = true;
  }
  res.render('calendar', { title: 'Calendar', week: week });
}

module.exports = {
    calendar
};
