pusheen = "https://res.cloudinary.com/andoo/image/upload/c_crop,h_175,r_100,w_173,x_74,y_0/v1484764852/vonrulf1kpsuhqlxobir.png"
profile_picture = "https://res.cloudinary.com/andoo/image/upload/c_crop,h_175,r_100,w_173,x_74,y_0/v1484764852/vonrulf1kpsuhqlxobir.png"
monachan = "https://res.cloudinary.com/dukcet22g/image/upload/v1487079390/kkuomujshaltfu9d52xf.png"
andrew1007 = "https://res.cloudinary.com/andoo/image/upload/c_scale,h_180,r_max,w_180/v1486926486/Screenshot_from_2017-02-12_11-07-50_ecwlbm.png"
bamflame97 = "https://res.cloudinary.com/andoo/image/upload/c_scale,h_180,r_max,w_180/v1486926676/Screenshot_from_2017-02-12_11-11-02_uduvu8.png"
pikachu = "https://res.cloudinary.com/andoo/image/upload/v1487039386/idt67nek7iflvengmmxa.png"
artemis = "https://res.cloudinary.com/andoo/image/upload/c_scale,h_180,r_max,w_180/v1486927000/Screenshot_from_2017-02-12_11-16-28_va2uox.png"
peralta = "https://res.cloudinary.com/andoo/image/upload/c_scale,h_180,r_max,w_180/v1486927257/Screenshot_from_2017-02-12_11-20-32_thyhxm.png"
jupiterhero = "https://res.cloudinary.com/andoo/image/upload/c_scale,h_180,r_max,w_180/v1487038532/Screenshot_from_2017-02-13_18-15-10_cin2ev.png"

pusheen_description = "As usual, I was sitting on top of my owner's laptop for more attention. But in the process, accidentally made a Pinterest clone. It was pretty cool and I'd love to accidentally make more websites. So am I web developer, or an adorable cat? Why not both?"
artemis_description = "I like art, as you may have figured out"
monachan_description = "Anime is life"
pikachu_description = "pika pika"
User.create!({username: "Pusheen", password:"password", profile_picture: pusheen,
  description: pusheen_description})
User.create!({username: "Artemis", password:"password", profile_picture: artemis,
  description: artemis_description})
User.create!({username: "mona-chan", password:"password", profile_picture: monachan,
  description: monachan_description})
User.create!({username: "bamflame97", password:"password", profile_picture: bamflame97})
User.create!({username: "andrew1007", password:"password", profile_picture: andrew1007})
User.create!({username: "pikachu", password:"password", profile_picture: pikachu,
  description: pikachu_description})
User.create!({username: "peralta", password:"password", profile_picture: peralta})
User.create!({username: "JupiterHero", password:"password", profile_picture: jupiterhero})

user_count = (1..8).to_a

user_count.each do |user_id|
  follow_count = rand((4..user_count.length))
  followed = []
  i = 1
  while i < follow_count
    user = rand(1..7)
    if user_id != user && !followed.include?(user)
      Follow.create!(user_following_id: user_id, user_followed_by_id: user)
      followed << user
    end
    i += 1
  end
end


g = Board.create!({user_id: 1, name:"Fellow Felines"})
pin_images = [
  "https://res.cloudinary.com/andoo/image/upload/v1486826048/e66ddbe6925551552200514fe8d114bc_fxuyn8.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486826194/7670360c4c619b9214bb719fb49e0076_pxtkey.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486826295/ea5e99e70a6682016fc8ed05c9a4705f_kxx3wb.png",
  "https://res.cloudinary.com/andoo/image/upload/v1486826436/c30e9bbaef3532e9b5b8964024f25a71_rwuih1.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486826518/1938759c9c5c889a59fe60b1a48b43fd_ycunct.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486826635/enhanced-buzz-1931-1374789664-0_ojgecm.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486826717/a54497574fc65243dc57b0a0b97b6582_oc7lz3.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486826817/image_ocxdso.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486826938/7c979fcfa51d2eccf1eaabd0d15884fb_babus1.jpg"
]
pin_title = [
  "A Bengal Cat",
  "A towel, obviously",
  "Cat Police Costume",
  "Princess Aurora",
  "I'm Not Single I Have a Cat",
  "A GORGEOUS Cat",
  "Christmas",
  "The Sink REALLY Belongs To Them",
  "Cats: It’s their world"
]
pin_body = [
  "A Belgian Bengal Cat Whose Deep Green Eyes and Unique Markings Make Him a Very Handsome Boy ",
  "",
  "Halloween plans",
  "A Photogenic Cat Royalty ",
  "I'm Not Single I Have a Cat The perfect mug for any crazy cat lovers.",
  "You know things are bad when a cat is prettier than you.",
  "",
  "The Dodo shares adorable pictures of cats who think the sink is their home.",
  "We’re just living in it "

]
pin_body.each_index do |idx|
  Pin.create!({user_id: 1, board_id: 1, title: pin_title[idx], body: pin_body[idx], image_url:pin_images[idx]})
end

#2
g = Board.create!({user_id: 3, name: "Free!"})
pins = [
  "https://res.cloudinary.com/andoo/image/upload/v1486827398/c2f99629bbcbf1e2765f6c89dbf2c7e1_cnxkyu.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486827479/5e05846cc8b34cd1759dfa11ed1b41fd_qkgtrr.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486827690/04bf9ee4d854169ec7ed1a0fc77f6312_dhdsz7.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486827906/e30f9c94bf2746c1fbd6057f39efff48_bq6e2t.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486827975/9ac230696dfe6e930e5c2bc4c3eff4a7_zkyuty.jpg",

]
titles = [
  "Just finished :(",
  "Free: the boy band??",
  "Free! - Iwatobi Swim Club",
  "Such great years",
  "They grow up so fast"
]
body = [
  "Just finished this anime, i want more episodes! Luckily the next season comes out in the summer!! ",
  "The Backstroke Boys. I would listen to this band ALL the time!!!!!!!!!!!!!!",
  "haruka nanase, haru nanase, haru, nanase, haruka, dolphin, free!, iwatobi",
  "I cANt BREatH << anime 2017 free! iwatobi swimm club haikyuu!! yuri on ice!! killing stalking",
  "Free! ~~ They grow up so fast :: Rei, Rin, Nagisa, Makoto and Haruka "
]
pins.each_index do |idx|
  Pin.create!({user_id: 3, board_id: 2, title: titles[idx], body: body[idx], image_url:pins[idx]})
end

#3
g = Board.create!({user_id: 3, name: "Black Butler"})
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486828301/6309af01a0817328b8fc580b0719db6c_knrb2c.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486828379/082a1983a0d9881c1ab31575e5b73c77_qvbour.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486828570/7600eb15ae9538d2ca6933c9e6428ca2_knyfdi.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486828652/8a3fff5c8e8076863b1d0e62ed0b0721_tcyprw.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486828787/4f53032f621b15bce5543e4aca266533_gvitrn.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486828855/6d308f612b23e22a92e187ddfdb05212_h6mmq7.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486828916/e0a6c9b29d8d86ce178777f81a6372f4_ifkmn8.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486829078/7f0a40d65430d29e1dbb0075c2855603_gcmyn5.jpg"
]
title = [
  "I came here for Sebastian, not feels",
  "!!",
  "Awesome cosplay",
  "LOL",
  "NG Sims 3",
  "A+",
  "Story of my life",
  "Watercolor"
]
body = [
  "And that's why I believe that Sebastian has at least some sort of feeling of love towards ceil because after all the pain he's gone through he's still kinder then alois or alot of other people.",
  "",
  "More proof that girls make the cosplayers",
  "",
  "Cieling... I AM DOING THIS TO THE ART ROOM ABSOLUTELY NO CHOICE I WILL HAVE MY CIELING ",
  "",
  "",
  "Black Butler Anime Manga Watercolor Print Poster Kuroshitsuji Ciel Phantomhive Sebastian Michaelis "
]
image.each_index do |idx|
  Pin.create!({user_id: 3, board_id: 3, title: title[idx], body: body[idx], image_url:image[idx]})
end

#4
g = Board.create!({user_id: 3, name: "Hitman Reborn"})
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486829391/4c7c0a013f8688c1a74e8a7d7a8ba49f_xnss8q.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486829487/77b15f6344adae617e50e8ecb3cf6783_krgbbr.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486829532/86bc99649b56f9f71530f0de29c234e8_r47mku.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486829663/7d945f11d02e4bbe14602435c41992dc_pfpdml.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486829705/903174c3aaa3c6a259b7035c54b5d9b5_ezsh6j.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486829803/c22220fbb0624d5a82c98162e62aec51_pjjbxu.jpg"
]
title = [
  "Katekyo",
  "My favsies",
  "Hibari",
  "",
  "",
  "Gilbird & Hibird XD"
]
body = [
  "",
  "",
  "Katekyo Hitman Reborn one of the best animes ever!!!!",
  "",
  "",
  "Hibari. Don't know why but for some reason I feel that Prussia (Gilbert) & Hibari could be great friends due to their similar partners in crime: Gilbird & Hibird. XD "
]
image.each_index do |idx|
  Pin.create!({user_id: 3, board_id: 4, title: title[idx], body: body[idx], image_url:image[idx]})
end

#5
g = Board.create!({user_id: 3, name: "Tokyo Ghoul"})
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486830287/301fa63c666d6b66e80e86600af1c846_yh7llo.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486830342/de4634681ca318d17ac0f706201d1767_fly1sn.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486830420/8d28ffe859509bcf7abc5a7dbe1e9003_b1ndjl.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486830478/fe88b7cc892ab3140285da73d82a4815_zkgdds.jpg"
]
title = [
  "Kaneki Ken",
  "",
  "kuro and shiro - Tim voi",
  ""
]
body = [
  "Tokyo Ghoul | Toukyou Kushu - Kaneki Ken ",
  "unravel - Tokyo Ghoul by randyhuang",
  "",
  ""
]
image.each_index do |idx|
  Pin.create!({user_id: 3, board_id: 5, title: title[idx], body: body[idx], image_url:image[idx]})
end

#6
g = Board.create!({user_id: 1, name: "Star Wars"})
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486830722/101f4e42b041c22ae8eccf45f4b2e31d_p17zes.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1484918490/guillem-h-pongiluppi-501-st-legion-vader-s-fist-vs-space-cockroaches-7-guillemhp_vtrqcn.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1484918488/ed3313d88e3d66499f1703108b55c469_or1uug.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1484918488/c74176b662dbce095f19dbeb56c19d69_i0il3k.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1484918489/2578005d06193c9411c4b88941acfd05_xtmeri.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1484918488/614668cb4a1279a746de621ef0fa881f_tw4bjf.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1484918488/303726a9fbff20073a3115c7d6ccc2b2_peaxmz.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1484918487/030c4a5300bfc448ffd3bdb06cfd012f_jjvyuq.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1484918487/35f051be4e5f9ace286398d40f2b705d_houxfe.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1484918488/624ae36b528c24bcf93c89de7ca8ed5e_dwcxs0.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1484918487/02e3ebf534ee41ccf6a9b2639512bef7_mw7abj.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486831020/2ee9a1ec53b6429ab595294a49e2112d_eiwbyc.jpg"
  ]
title = [
  "Star Wars Force of Darkness Art Print",
  "Great pic",
  "Fan art!",
  "More vader :)",
  "New order stormtrooper design",
  "Deathstart... I think?",
  "A kickback to the old movies",
  ":)",
  "New order!",
  "Final battle",
  "Obi-wan!!",
  "New movie!"
]
body = [
  "Iconic characters from the Star Wars universe who have been lured to the Dark Side unleash their evil on the Star Wars Force of Darkness Art… ",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "The Title For ‘Star Wars: Episode VIII’ Has Been Revealed "
]
image.each_index do |idx|
  Pin.create!({user_id: 1, board_id: 6, title: title[idx], body: body[idx], image_url:image[idx]})
end

#7
g = Board.create!({user_id: 1, name: "Funny"})
  image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486831270/225edde5ce454be6d79b65657f9d7fe9_u05onp.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486831353/fe693fdd25004815677dd6d5304a746d_anl0d0.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486831393/8bab46e118515257dcafb665c0f753f8_d70qog.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486831447/7696d8440bc9b47b6beb755832c0b967_uxhboh.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486831506/07f63a6b66f18387d409cdd0342f55b8_v51oaz.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486831592/807afadbf3a1bc619828c9a15f6a32ab_nztows.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486831721/62e4703e2e395a42d91d993a11da1ab6_gz8ahf.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486831804/d0ec0e1dd46013b3017b497c88416a67_jcwwtq.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486831895/249d0d8060020bdffc3680072c790a4a_exalxn.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486831945/02d546fe72c5d1b9feb2490d39652a05_xyk4yr.jpg"
]
title = [
"Make your day better",
"Did someone say bacon?",
"Doggies",
"Why I can't sleep at night",
"Happy Monday",
"worst seal ever",
"Best love story ever",
"Aww :(",
"definitely fabs",
"Happy Friday"
]
body = [
"",
"",
"",
"Everybody else has this problem... right?",
"my favorite day of the week",
"Pretty cute though.. I GUESS",
"Like the notebook",
"",
"",
"the ACTUAL best day of the week"
]
image.each_index do |idx|
Pin.create!({user_id: 1, board_id: 7, title: title[idx], body: body[idx], image_url:image[idx]})
end

#board 8
Board.create!({user_id: 7,name:"Delish"})
  title = [
    "Mongolian Beef Ramen",
    "Buffalo popcorn chicken",
    "Pasta with Chicken Broth, Butter and Parmesan"
  ]
  body = [
    "
    Ingredients\n
    Meat:\n
    1 lb Sirloin streak\n
    Produce:\n
    1 large head Broccoli\n
    1 Carrot\n
    3 Garlic cloves\n
    1 tsp Ginger\n
    3 Green onions\n
    Canned Goods:\n
    1 cup Chicken broth\n
    Condiments:\n
    1/2 cup Soy sauce\n
    Baking & Spices:\n
    1/4 cup Brown sugar\n
    2 tbsp Corn starch\n
    1 pinch Red pepper flakes\n
    1 Sesame seeds, Toasted\n
    Oils & Vinegars:\n
    1 tbsp Sesame oil\n
    2 tbsp Vegetable oil\n
    Other:\n
    3 package Instant ramen, flavor pack discarded",
    "Instant ramen noodles never tasted so good.
    Ingredients:\n
    Meat:\n
    1 lb Sirloin streak\n
    Produce:\n
    1 large head Broccoli\n
    1 Carrot\n
    3 Garlic cloves\n
    1 tsp Ginger\n
    3 Green onions\n
    Canned Goods:\n
    1 cup Chicken broth\n
    Condiments:\n
    1/2 cup Soy sauce\n
    Baking & Spices:\n
    1/4 cup Brown sugar\n
    2 tbsp Corn starch\n
    1 pinch Red pepper flakes\n
    1 Sesame seeds, Toasted\n
    Oils & Vinegars\n
    1 tbsp Sesame oil\n
    2 tbsp Vegetable oil\n
    Other:\n
    3 package Instant ramen, flavor pack discarded",

    "Ingredients\n
    Meat:\n
    3 Chicken breasts, boneless skinless\n
    2 cups Frank's buffalo wing sauce\n
    Refrigerated:\n
    3 Eggs\n
    Baking & Spices\n
    1/2 cup Flour\n
    1 Salt and pepper\n
    Bread & Baked Goods:\n
    1/3 cup Bread crumbs, plain\n
    1 cup Panko bread crumbs",
    "This Pasta with Chicken Broth, Butter and Parmesan is pure comfort food!
    It is a bowl of wonderful, warming, healing amazingness. One…\n
    Ingredients:\n
    Produce:\n
    1 Basil, fresh\n
    Canned Goods:\n
    4 cups Chicken stock\n
    Pasta & Grains:\n
    2 cups Pasta shapes, small\n
    Baking & Spices:\n
    1 Black pepper\n
    1 Salt\n
    Dairy:\n
    60 g Butter\n
    1/4 cup Parmigiano cheese, grated"
  ]
  image = [
    "https://res.cloudinary.com/andoo/image/upload/v1486917898/3dea7ba6b6b8c23dfd97d88c28aa4737_qtcoug.jpg",
    "https://res.cloudinary.com/andoo/image/upload/v1486917991/7f5ff0396db05cdab9344315c44ab2c9_bcdbuk.jpg",
    "https://res.cloudinary.com/andoo/image/upload/v1486918087/39acfedbf4e07d268375121a86bd4478_u0acbx.jpg"
  ]
  image.each_index do |idx|
    Pin.create!({user_id: 4, board_id: 8, title: title[idx], body: body[idx], image_url:image[idx]})
  end
  title = [
    "Cinnamon Roasted Chickpeas",
    "Patty Melt",
    "Crack Slaw",
    "Chili Cheese Dog Pizza"
  ]
  body = [
    "These sweet, crunchy chickpeas deliver in the snack department! Only four ingredients needed for this healthy, high protein, gluten free and…
    Ingredients:
    2 cans of garbanzo beans, 15oz each (another name for chickpeas)
    2 Tbsp. olive oil
    4 Tbsp. brown or dark brown sugar
    2 Tbsp cinnamon
    ¼ tsp. salt, optional",
    "A griddled sandwich of ground beef, caramelized onions, cheese, and rye bread, the patty melt is a beloved staple of the burger lexicon.
    ",
    "Low Carb Crack Slaw – Persnickety Fitness by Mandy Jo",
    "Meat:
      1/2 tsp Better than bouillon beef base
      1 lb Ground beef, quality lean cooked and finely chopped
      4 Hotdogs, quality
      Produce:
      1/4 tsp Garlic powder
      Canned Goods
      1 (6 oz.) can Tomato paste
      Condiments:
      1/2 tsp Balsamic vinegar
      1/4 tsp Table mustard, spicy brown or regular
      1 1/2 tsp Worcestershire sauce
      Baking & Spices:
      1/4 tsp Black pepper, coarse ground
      1/4 tsp Brown sugar, dark
      1/4 tsp Cajun seasoning such as slap ya mama
      1/4 tsp Cayenne
      2 tbsp Chili powder
      1/2 tsp Paprika, sweet smoked
      1 lb Pizza dough
      1/4 tsp Red pepper flakes
      1/4 tsp Salt, smoked
      1/4 tsp Table salt, regular
      Nuts & Seeds:
      1 tbsp Cumin
      Liquids:
      1 1/4 cups Water
      Other:
      ½ of an 8 oz. bag Sargento Off the Block Mozzarella and Provolone Blend Traditional Cut shredded cheese, or your own preferred brand
      ½ cup V8 Spicy Hot Tomato Vegetable Juice"
  ]
  image = [
    "https://res.cloudinary.com/andoo/image/upload/v1486918542/23337f62163b7b224eeab59adf32444d_omp2hk.jpg",
    "https://res.cloudinary.com/andoo/image/upload/v1486918713/0daa82daa34a2d6e6bf3cf7235e7b734_imfe8i.jpg",
    "https://res.cloudinary.com/andoo/image/upload/v1486918818/a79407825fd87a8926d6dd5f79d20d4f_okyhxo.jpg",
    "https://res.cloudinary.com/andoo/image/upload/v1486918920/94a81e6bfb937288fcd028c7abf3ecab_vufmvi.jpg"
  ]
  image.each_index do |idx|
    Pin.create!({user_id: 4, board_id: 8, title: title[idx], body: body[idx], image_url:image[idx]})
  end
  title = [
    "S'mores Waffle Sundaes",
    "Leprechaun Dessert Shooters",
    "Garlic Parmesan Mozzarella Alfredo (Skinny!)",
    "Oreo Chocolate Chip Cheesecake Cookie Bars"
  ]
  body = [
    "Mini waffles are topped with ice cream, toasted marshmallows and all the fixings to create epic S'mores Waffle Sundaes.
    Ingredients:
    1 large egg
    2 tablespoons light brown sugar
    1 cup milk
    1/4 cup vegetable oil
    1/2 teaspoon pure vanilla extract
    1 cup all-purpose flour
    1/2 cup graham cracker crumbs (about 4 full sheets)
    2 teaspoons baking powder
    pinch of salt
    ice cream
    homemade hot fudge sauce
    8 Campfire® Giant Roasters or Campfire regular marshmallows, toasted
    whipped cream
    sprinkles
    maraschino cherries",
    "Leprechaun Dessert Shooters, easy dessert recipes, easy recipes, st. patricks day, st patricks day food, st patricks day recipes, pudding…
    Ingredients:
    Vegetarian:
    Baking & Spices
    1 Chocolate chips, mini
    3 drops Food coloring, green
    1 Rainbow sprinkles
    1 Whipped cream
    Snacks:
    4 Oreo cookies
    Desserts
    1 package Vanilla pudding - prepared to package directions, instant",
    "I crave food that’s sweet and spicy. (Exhibit A, Exhibit B, Exhibit C) I crave food with a variety of textures. (Exhibit A, Exhibit B,…
    Ingredients:
    Produce:
    6 Garlic cloves
    1 tsp Onion pwdr
    Canned Goods
    1 1/2 cups Chicken broth, low sodium
    Pasta & Grains:
    1 lb Fettuccine
    Baking & Spices:
    1/4 cup All-purpose flour
    1/4 tsp Black pepper
    1/4 tsp Red pepper flakes
    1/2 tsp Salt
    Oils & Vinegars:
    2 tbsp Olive oil
    Dairy:
    1 1/2 cups Milk, lowfat
    3/4 cup Mozzarella cheese
    1/2 cup Parmesan cheese",
    "Oreo Chocolate Chip Cheesecake Cookie Bars"
  ]
  image = [
    "https://res.cloudinary.com/andoo/image/upload/v1486919035/3d9d81970685f08246dfc4850bc66e08_lvyjap.jpg",
    "https://res.cloudinary.com/andoo/image/upload/v1486919143/abe8ec56ba00b43ce692fa6d4b383d47_vvigpg.jpg",
    "https://res.cloudinary.com/andoo/image/upload/v1486919288/25ddb0dc68b4a42355a89d8efcaea622_qisll1.jpg",
    "https://res.cloudinary.com/andoo/image/upload/v1486919362/288c70e5c54b3e12815dd1664b43a749_q4r9nl.jpg"
  ]
  image.each_index do |idx|
    Pin.create!({user_id: 4, board_id: 8, title: title[idx], body: body[idx], image_url:image[idx]})
  end



#board 9
Board.create!({user_id: 4, name:"Men's Fashion"})
title = [
  "What to Wear On A New Year's Eve?",
  "The dress shirt fit",

]
body = [
  "",
  "",
]
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486920144/b05bf6a10a47419d2147f5bb11425dd1_nwf3cn.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486920207/1f1ad3706d3fa195e2e2d3672bffd942_zl0h4h.jpg",
]
image.each_index do |idx|
  Pin.create!({user_id: 4, board_id: 9, title: title[idx], body: body[idx], image_url:image[idx]})
end

title = [
  "Every Guy Should Own A Camel Overcoat",
  "Great look",
  "Medium Hairstyles To Make You Look Younger",
  "So sharp",
  "Great scarf"
]
body = [
  "Overcoats are hugely in fashion this year and for good reason. They give off a sophisticated business friendly vibe but at the same time…",
  "hoodie // plaid shirt // joggers // tan sneakers",
  "Do you have a medium hairstyles? Are you planning to grow them longer or maintain them for a variety of hairstyle you can explore with?…",
  "Your groom will look sooooooo sharp! Get the S by Sebastian Dinner Jacket and you won't go wrong. Be Bold. "
]
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486920618/ebe0cadbc16ce71c2308f9b6c030d490_aq2ltj.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486920675/2b43c506998eb4fa7297c2ea264f3989_vlsyhu.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486920729/9fa029841c6dd5ce5243dcf01005f461_tuztwb.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486920781/a6e92268f91e84abb541e19e8f162b59_u4flp1.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486920894/45fca59db4b5bd920a8a6ae1e5732feb_epyfqs.jpg"
]
image.each_index do |idx|
  Pin.create!({user_id: 4, board_id: 9, title: title[idx], body: body[idx], image_url:image[idx]})
end

#board 10
Board.create!({user_id: 5, name:"Zelda"})
title = [
  "Dark link fight in the water temple",
  "Young Link and Navi",
  "Navi... sooooo annoying",
  "So true LOL",
  "Cucco Fury",
  "Forest temple",
  "Twilight Princess",
  "SONG OF TIME T-Shirt",
  "Ganon's Castle"
]
body = [
  "One of my favorite fights",
  "Legend of Zelda by Conor Burke",
  "",
  "Worst reason ever",
  "Everybody learns their lesson at least once",
  "Illustrator/Legend of Zelda fan Jessica Smith, to celebrate Zelda Wii U coming out this year, painted this magnificent picture of what the…",
  "The Legend of Zelda: Twilight Princess watching this game is like watching a movie! (A GOOD movie :))",
  "SONG OF TIME T-Shirt",
  ""

]
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486920993/3eac92deada76c095d8f6596665d1859_uipyms.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486921104/ee14168cce175bb26fef3e7ebd18d66e_hpwy5x.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486921164/57a60b7992c9befbf87bc0afddb5f18e_ck6ozf.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486921245/cb16f47afd5826297c6cf70900449f65_pv8r60.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486921303/c88986c49226db4ffee2eb4da005079c_gpr0cy.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486921409/f5e0e7e644d817c048d5c1e7a4b7d0f2_bjqlld.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486921455/25ca0beb814b6c125444828e70a01f33_hxciyv.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486921519/f179a7b39588cf0b22a63d66d2171c01_eyxpx9.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487029822/345e8c38f7cde417816fad5c8fe7b472_hzb48v.jpg"
]
image.each_index do |idx|
  Pin.create!({user_id: 5, board_id: 10, title: title[idx], body: body[idx], image_url:image[idx]})
end
title = [
  "Now that you think about it...",
  "Sheik Fanart"
]
body = [
  "wut.",
  "Sheik (Princess Zelda's alter ego) ~ The Legend of Zelda: Ocarina of Time ~ Legend of Zelda Fan Art"
]
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486921672/86b90495f58fc13714e5b8ccbebbdb70_lkrdd2.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486921785/067a765c276f3e51b91c82daabe3da27_aatpni.jpg"
]
image.each_index do |idx|
  Pin.create!({user_id: 5, board_id: 10, title: title[idx], body: body[idx], image_url:image[idx]})
end

#board 11
Board.create({user_id: 5, name:"Dishonored"})
title = [
  "Dishonored 2 teaser",
  "Corvo's shade"
]
body = [
  "Really intrigued, but knowing my computer, I can maybe just about handle the first game instead. Perhaps if I feel like a detour from the AC marathon...",
  "It is really fun to use game characters in RPG as NPCs... And really, really, REALLY fun to use them as villains... (Corvo from Dishonored by AJ Hateley)"
]
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486921991/668cc69e5d32097ea84f92072f0c3561_hos5tj.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486922049/65156b35789f72e84182a8c7113f8c56_pz3e4h.jpg"
]
image.each_index do |idx|
  Pin.create!({user_id: 5, board_id: 11, title: title[idx], body: body[idx], image_url:image[idx]})
end

#board 12
Board.create({user_id: 6, name:"Pixar"})
title = [
  "Gorgeous Wall-E",
  "One of my Favorites",
  "Here to take us to a better place...",
  "Up",
  "Monsters inc minimalist",
  "I love her"
]
body = [
  "Wall-E reminds me of one of my bff's he is so funny and does not talk much....wall-E",
  "Buzz & Woody, the leaders, try to save the toys while they overcome obstacles. Exactly what Odysseus did, which was also the leader in The Odyssey.",
  "The Claw by Danny Handke, Available in WonderGround Gallery in Downtown Disney District at the Disneyland Resort",
  "Austin's Mondo Gallery has partnered with Oh My Disney for a new art exhibit titled Nothing’s Impossible, which pays tribute to classic…",
  "",
  "I never look back, darling. It distracts from the now. -Edna Mode in 'The Incredibles', Pixar movie quotes"

]
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486922267/552134ec3049f3adcd43fc38284cd67e_ou5cnb.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486922343/0edec46280f825b6220026e87ec4f535_idz3dh.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486922406/b1b1b2121c3d7895e3a880d871cd067b_azgd21.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486922493/013be79bb1461d4440a39156d65515f1_mz6msn.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486922557/8b3c44575d5303e713f098f0cb0c6bb1_u8lkbg.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486922672/7524fa88a48afe2c4fb287e103166b20_hhy8f0.jpg"
]
image.each_index do |idx|
  Pin.create!({user_id: 6, board_id: 12, title: title[idx], body: body[idx], image_url:image[idx]})
end
title = [
  "You look a little cold",
]
body = [
  "Remember to wrap up warm when outside in the snow.",
]
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486922739/3fe747f1e1073a3a6d68685a3980319f_h7ibop.jpg",
]
image.each_index do |idx|
  Pin.create!({user_id: 6, board_id: 12, title: title[idx], body: body[idx], image_url:image[idx]})
end

#board 13
Board.create({user_id: 7, name:"Women's fashion"})
title = [
  "Trending in Summer 2016",
  "Masculine Fashion Ideas For Women",
  "Women's Two Tone Pumps - 2 Colors",
  "Unboring Work Outfit For You",
  "Florals and Stripes",
  "Oversized Scarf + Leather Moto Jacket ",
  "Ruched Design Destroy Washed Moto Jeans",
  "Fashion Horned Rim Outline Sunglasses",
  "Ecstasy Models"
]
body = [
  "",
  "",
  "Unboring Work Outfit For You Here are some hints on how you can make boring work outfits look interesting: Add some color",
  "",
  "",
  "",
  "",
  "",
  ""
]
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486930728/8a8e3f82d9ac56f3a18ff0331c84bc47_y2k0hy.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486930966/066e5ac27b83f29628b969986532cefd_ymuqld.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486931018/bba004f0007962096c0391d2c3d5c616_zygkax.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486931089/26663ed6dcb4c55c30d2a9c58b54b901_pkvd8c.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486931145/6d3540628cbf87e19c483facee8ebac2_y8ugvr.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486931169/63ba7672dfd48f387d12717499051eb2_qd5rjl.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486931222/8a1e4a4fe799fb460665f00ada81e9a3_i03s4j.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486931312/a5c8c64c3da1e2067f9602ecd1743ff3_shb5gx.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486931392/88fadd683e03ddd64b1844b31f14985f_s2oji8.jpg"
]
image.each_index do |idx|
  Pin.create!({user_id: 7, board_id: 13, title: title[idx], body: body[idx], image_url:image[idx]})
end

#board 14
Board.create({user_id: 2, name:"Paintings"})
title = [
  "Impressionistic Iris Illustrations",
  "Charles White Secluded Gazebo",
  "Jeremy Miranda",
  "",
  "What Element Are You?",
  "Mind-Twisting Optical Illusion Paintings By Rob Gonsalves",
  "Can You Name All 55 Colors?",
  "Book Art Is Awesome: Drawn Edition",
  "The Artwork of Leonid Afremov",
  "Painting Black Cat Kitten schwarze Katze Chat noir Art by AiA"
]
body = [
  "Pavel Guzenko - The eyes are what most people gravitate towards when looking at any sort of portrait",
  "A secluded gazebo is barely visible behind the luxurious flowering bushes in another beautiful floral garden print by award winning artist Charles White.",
  "As I was perusing Emily Henderson’s blog today I came across a post where she was talking about several artists that she really liked.",
  "",
  "Go on an adventure with this test to see which of the 7 elements of life you represent with your mind, heart and spirit",
  "",
  "How good is your color knowledge?",
  "I am so sorry.The pieces in the previous book art posts were largely unattainable. We were talking large-scale sculptures or art gallery…",
  "Belarusian painter Leonid Afremov is one of the most colorful painters you’ve never heard of. His skill with a palette knife and oil paint…",
  "I used to have 2 black cats; however, one of them passed away, so I only have one. His name is Lovey ♥ I miss his most of all while I'm in college!"

]
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486957751/5176304319bf8225a7ab693013642777_xwxguk.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486957838/431643e9264500d906a562d4ea3387e3_gjh88f.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486957888/b88477463943485478c90fdd13243681_zbkuto.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486957923/48374e1d6b0628e3659b55c7d8bf99dd_oivdkx.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486957987/153c381fbb537893047153bad1819568_flpsed.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486958074/14ba8148eaeeb20b65c8c04f03cf624e_azdrz8.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486958034/7c0f28dcb5291057b8a258c6b5c7ae00_eycsa7.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486958139/eb809f22b17f4df489472e3cf9770e30_yidgwn.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486958255/ca9a00412d96260ae7685ed5f75d514c_bksspd.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486958213/v_np4p16.jpg"
]

image.each_index do |idx|
  Pin.create!({user_id: 2, board_id: 14, title: title[idx], body: body[idx], image_url:image[idx]})
end

#board 15
Board.create({user_id: 4, name:"Movie Posters"})
title = [
  "Star Wars Posters From Around the World",
  "Guardians of the Galaxy Poster by Florey",
  "Jaws",
  "Back to the Future (1985)",
  "An Alternative ‘Alien’ Poster",
  "Se7en by Christopher Cox More",
  "Minimalist Skyfall",
  "Minimalist Star Wars Poster",
  "The Dark Knight"
]
body = [
  "",
  "",
  "",
  "Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his…",
  "",
  "",
  "",
  "",
  ""
]
image = [
  "https://res.cloudinary.com/andoo/image/upload/v1486958686/69cc89ce76e6a4c762730c2024241880_avtup7.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486958872/056649dcf638e8006a31af8f25a0f725_pqbq6h.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486958897/43308731958b3b64b4dc743484892881_bsb2fv.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486958961/63bbe130a2fbf9c2240c7c9c44f13c3a_rw9e4u.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486959017/1440a6f863758811ea8b954d5a555397_ythami.jpg",
  'https://res.cloudinary.com/andoo/image/upload/v1486959078/1bf9bdde8f8ecd5d6a77694723bf02bb_1_xqhcv3.jpg',
  "https://res.cloudinary.com/andoo/image/upload/v1486959210/80f8f9dd74d76f3ebc6b1caf1e9989e5_jlypfx.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486959150/864802d9fae547f8b72a1c88af852162_mtnymk.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1486959121/da3bbe3597cdc8b787b8a2577ecfc3cf_leipq8.jpg"
]
image.each_index do |idx|
  Pin.create!({user_id: 4, board_id: 15, title: title[idx], body: body[idx], image_url:image[idx]})
end


title = [
  "Come join us for a Paint Nite Party!",
  "Starry night with silhouette mountains",
  "art and painting image",
  "NLIT BRANCHES BY LITTLESPARROWGALLERY",
  "Abstract Landscape",
  ""
]

body = [
  "",
  "",
  "",
  "",
  "",
  ""

]

image = [
  "https://res.cloudinary.com/andoo/image/upload/v1487013846/a4b1602e05d757c02c661bdb2d2e1326_p7npsm.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487013943/01d3ecb704f32b2776c00daaa8c32531_qbljgt.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487013995/d204f4340446f7dcb98c476df5a509a4_hynxao.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487014059/23ac4f99b593a92a38903bbc55cdcb65_ofg4a2.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487014110/7e0bdbe1a55784cd8761d0bfa2eb4ee9_nlh3u4.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487014219/48dbc3452bdb636e017924fb2038a607_1_da2owj.jpg"
]

image.each_index do |idx|
  Pin.create!({user_id: 2, board_id: 14, title: title[idx], body: body[idx], image_url:image[idx]})
end



title = [
  "Watercolor Tree Painting",
  "Makes me want to paint!",
  "Oil painting",
  "Realistic flower",
  "By Denis Mayer Jr.",
  "Dynamic Cityscape",
  "Van Gogh"
]

body = [
  "",
  "",
  "",
  "",
  "",
  "",
  ""
]

image = [
  "https://res.cloudinary.com/andoo/image/upload/v1487027835/d311c3ca0cbd867d21a03e63cf8bf21f_lisoha.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487027887/1b06a2abe5efbf6f82da06140e8f59c2_n7o54l.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487027961/d7ac98006f180cc2eb34fa68d4c41614_hyxkli.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487028019/46dcdc7fe72c3090d28ba0a15979efce_b2tfbd.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487028073/0226fe8d91473a89241e99e5e42b2adb_iqbktq.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487028123/57a062462bc7769370a9619638c4835d_g8djnf.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487028172/a3ad823ae8e6232ff6f0e8e929b4cd80_h5p6ji.jpg"
]

image.each_index do |idx|
  Pin.create!({user_id: 2, board_id: 14, title: title[idx], body: body[idx], image_url:image[idx]})
end

#board 16
Board.create({user_id: 6, name:"Pokemon"})

title = [
  "The possibilities - Eeveelution rainbow",
  "My Inner Self",
  "Recharging",
  "",
  "What.",
  "Dragon in the pond",
  "Way too cute"
]

body = [
  "By WalkingMelonsAAA.... on @DeviantArt",
  "Created by Ramy Badie",
  "",
  "Commission for 1MrGray by eldrige.deviantar... on @DeviantArt",
  "",
  "Dratini No.147",
  ""

]

image = [
  "https://res.cloudinary.com/andoo/image/upload/v1487028960/a2eb29ed5a417e32bd0336a223b2b171_vswxlx.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487029186/38b2d7350bde5cb6efce3d5cb3092c42_iyxafr.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487029246/download_xlljvf.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487029341/d4af2cad838609e6afe29dfb8c33703a_1_bxw5r5.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487029378/41466becd6024d848fd30a56f838ff97_maxg4k.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487029444/0365026eaf823062a3b706e73c82b53d_k1z5ff.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487029666/f136c077c83571bbedc1b04b4917b809_sjlgh8.jpg"
]

image.each_index do |idx|
  Pin.create!({user_id: 6, board_id: 16, title: title[idx], body: body[idx], image_url:image[idx]})
end

#board 17
Board.create({user_id: 5, name:"Outer Space"})
title = [
  "Expansion of the Mind",
  "Nebula",
  "Earth and moon shot",
  "The constellation Orion",
  "Hubble site-X-ray-helix nebula",
  "Which Galaxy Will You Reincarnate Inside?"
]

body = [
  "",
  "A nebula (from Latin: 'cloud') is an interstellar cloud of dust, hydrogen, helium and other ionized gases.",
  "",
  "",
  "",
  ""
]

image = [
  "https://res.cloudinary.com/andoo/image/upload/v1487030164/f598b995df872477e918991f4e45be7d_hsesng.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487030224/50d0720e44ff33b3e355cdeced8dd6ef_dcci0n.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487030272/3516a21e68224800cc6ed2b06070c40b_skkbjs.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487030348/a8b6b1111aba5a0ed8a755d4d8cbc990_c2cz9q.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487030395/b93fa4a76dd5435d2df38f075917b524_jvruyn.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487030436/12778cc02d4df53fa64c10505ca9b35d_v8jnfc.jpg"
]

image.each_index do |idx|
  Pin.create!({user_id: 5, board_id: 17, title: title[idx], body: body[idx], image_url:image[idx]})
end


title = [
  "Earth horizon",
  "",
  "",
  "",
  "Hubble Space Telescope has revealed the universe to us"
]

body = [
  "Moon rising in front of the milky way. Beautiful picture of outer space",
  "",
  "",
  "",
  ""
]

image = [
  "https://res.cloudinary.com/andoo/image/upload/v1487037474/d771a8d2347820dbdec7b06de8cbbf51_xso5ya.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487037504/tumblr_ohc8ukLHf91uc0ho8o1_1280_hvklc8.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487037474/d771a8d2347820dbdec7b06de8cbbf51_xso5ya.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487037514/af07617056c54c06c4dc318701ecfb95_v8hisr.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487037542/b519eb935f13c9ba11326289d492c394_uck88d.jpg"
]

image.each_index do |idx|
  Pin.create!({user_id: 5, board_id: 17, title: title[idx], body: body[idx], image_url:image[idx]})
end

#board 18
Board.create({user_id: 8, name:"The Outdoors"})

title = [
  "",
  "Spirit Island",
  "Boundary Waters Canoe Area",
  "The Boundary Water Canoe Area (BWCA) is a pristine place",
  "",
  "",
  "Desvre",
  ""
]

body = [
  "",
  "Spirit Island, is a tiny island in Maligne Lake in Jasper National Park. In British Columbia, Canada.",
  "",
  "",
  "",
  "",
  "",
  ""
]

image = [
  "https://res.cloudinary.com/andoo/image/upload/v1487037957/c4f4ef5e157868565ff38b4c76de455f_wprs3v.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487038025/3e1b05fe0a5cbdc8e044d6043af7e766_szhhbs.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487038075/97a68fff4bad68830241d6928118c88d_ueu5tn.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487038113/6751c3d814fdda7db7e4844c3007db7c_a4pbpo.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487038177/74d351126335bb0d568a54845e7458ab_q1knd9.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487038219/a6c66bf85913c7bfc0cc8588c217db50_ilfrel.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487038251/5d5839590b51a828dcf9ee004152c170_lpn2rm.jpg",
  "https://res.cloudinary.com/andoo/image/upload/v1487038279/97f39de35862e3706b7a446df7a93bcb_isnr1g.jpg"
]

image.each_index do |idx|
  Pin.create!({user_id: 8, board_id: 18, title: title[idx], body: body[idx], image_url:image[idx]})
end
