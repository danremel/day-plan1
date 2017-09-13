# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Day.destroy_all
Task.destroy_all

brothers_birthday = Day.new(name: "Brother's Birthday", date: "2017-06-22")

brothers_birthday.tasks = [
  Task.new(name: "Clean the house", description: "Vacuum the floors, tidy up the living room.", priority_level: 2, completion_time: "3PM", completed: false, day_id: 2),
  Task.new(name: "Get the Cake", description: "Special ordered from bakery. Chocolate Ice Cream C...", priority_level: 3, completion_time: "4PM", completed: false, day_id: 2),
  Task.new(name: "Decorate the living room", description: "Hang up streamers and inflate balloons", priority_level: 1, completion_time: "5PM", completed: false, day_id: 2)
]

anniversary =  Day.new(name: 'Anniversary', date: "2017-04-21")

anniversary.tasks = [
  Task.new(name: "Make dinner reservation", description: "Wisteria - Table for two, 8:30pm", priority_level: 3, completion_time: "12PM", completed: false, day_id: 3),
  Task.new(name: "Pick up suit", description: "Bring ticket to dry cleaner", priority_level: 2, completion_time: "2PM", completed: false, day_id: 3),
  Task.new(name: "Pick out a card and gift", description: "Pick a romantic card. Get her a puppy!", priority_level: 2, completion_time: "4PM", completed: false, day_id: 3)
]

graduation_day = Day.new(name: "Graduation Day", date: "2017-03-15")

graduation_day.tasks = [
  Task.new(name: "Pick out a nice outfit", description: "Button down, cuffed jeans, leather boots", priority_level: 2, completion_time: "8AM", completed: false, day_id: 4),
  Task.new(name: "Present your project", description: "Make sure it works", priority_level: 3, completion_time: "2PM", completed: false, day_id: 4),
  Task.new(name: "Celebrate", description: "Holy crap it's over", priority_level: 3, completion_time: "5PM", completed: false, day_id: 4)
]


brothers_birthday.save
anniversary.save
graduation_day.save
  