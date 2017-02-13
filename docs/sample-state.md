```js
{
  currentUser: {
    id: 1,
    username: "andrew"
  },
  forms: {
    signUp: {errors: []},
    logIn: {errors: []},
    createPin: {errors: ["image required"]}
  },
  pins: {
    1: {
      title: "The cutest cat EVER",
      description: "My cat. PinterestMe exists solely for others to admire my cat.",
      image_url: "www.radicalcatz.com/img/3.jpg",
      user_id: 1,
      username: "Jessica483"
      boards: {
        1: {
          id: 3,
          name: "Cute Animals"
        },
        2: {
          id: 20,
          name: "Cats over Dogs"
        }
      },
      tags: {
        1: {
          id: 20,
          name: "cute"
        },
        2: {
          id: 45,
          name: "furry"
        }
      },
      comments: {
        1: {
          id: 30,
          body: "psh. ugly cat. TOTALLY NOT CUTE!!"
          user_id: 4
          username: "hater4lyfe"
        },
        2: {
          id: 85,
          body: "It is literally impossible to not like my cat. Go away.",
          user_id: 1
          username: "Jessica483"
        },
        3: {
          id: 93,
          body: "duz your cat even lift? i bet my cat could beat up your cat."
          user_id: 4,
          username: "Hater4lyfe"
        },
        4: {
          id: 120,
          body: "#internetfights",
          user_id: 1,
          username: "debraz2kewl349"
        }
      }
    }
  }
}
```
