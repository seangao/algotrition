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
              ingredients: ["Banana", "Strawberry"]
            },
            {
              id:2,
              name: "Plain yoghurt",
              ingredients: ["Yoghurt"]
            },
            {
              id:3,
              name: "Coffee with sugar",
              ingredients: ["Coffee", "Sugar"]
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
              ingredients: ["Eggs", "Salt", "Oil", "Pepper"]
            },
            {
              id:5,
              name: "Plain yoghurt",
              ingredients: ["Yoghurt"]
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
              ingredients: ["Tomato", "Lettuce", "Olive oil"]
            },
            {
              id: 7,
              name: "Pasta with chicken",
              ingredients: ["Pasta", "Chicken", "Oil", "Parmesan"]
            },
            {
              id: 8,
              name: "Apple",
              ingredients: ["Apple"]
            },
            {
              id: 9,
              name: "Banana",
              ingredients: ["Banana"]
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
              ingredients: ["Banana", "Strawberry"]
            },
            {
              id:11,
              name: "Plain yoghurt",
              ingredients: ["Yoghurt"]
            }
          ]
        }
      ]
    }
  ]
  res.render('calendar', { title: 'Calendar', week: week });
}

module.exports = {
    calendar
};
