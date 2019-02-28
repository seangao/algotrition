function calendar(req, res, next) {
  var week = [
    {
      name: 'Monday',
      id: 1,
      recipes: [
        {
          name: "Banana smoothie",
          ingredients: ["Banana", "Water"]
        },
        {
          name: "Yoghurt",
          ingredients: ["Milk"]
        }
      ]
    },
    {
      name: 'Tuesday',
      id: 2,
      recipes: [
        {
          name: "Sticky rice",
          ingredients: ["Rice", "Water"]
        }
      ]
    }
  ]
  res.render('calendar', { title: 'Calendar', week: week });
}

module.exports = {
    calendar
};
