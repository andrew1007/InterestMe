# InterestMe

[InterestMe](https://interest-me.herokuapp.com/#/) is a web application for users to share pictures. Inspired by Pinterest, InterestMe allows users to create boards, share images, and follow users. InterestMe is a personal project by Andrew Yueh

![homepage]
[homepage]: ./docs/images/homepage.png

## Features

 - User accounts with secure authentication
 - User profiles with access to all of their content
 - Home feed with infinite scrolling
 - Follows feature
 - Board and pin creation

## Infinite Scrolling

To create highly responsive infinite scrolling, JSON pin responses were pulled in as batches of pins. Each set of pins were rendered on an as-needed basis. This lowers backend querying. It also reduces the bandwidth speed requirements, when compared to rendering a large number of pins simultaneously. Below is a simplified version of its implementation.

###Infinite Scrolling Backend
```ruby
def index
  pins = Pin.where.not(user_id: current_user.id).shuffle
  pin_sets = pins.length / 20
  @pin_batches = {}
  (0...pin_sets).each do |set|
    pin_set = pins[(set*20)...(set*20 + 20)]
    pin_set_hash = pin_set.as_json
    @pin_batches[set] = pin_set_hash
  end
  render :index
end
```

### Infinite Scrolling Frontend
```javascript
loadMorePins(){
  let i = this.state.pinBatchCounter
  let newPinSet = this.props.board.pins[i]
  this.setState({
    currentlyRenderedPins: this.state.currentlyRenderedPins.concat(newPinSet),
    pinBatchCounter: this.state.pinBatchCounter + 1
  })

pinTileRender(){
  return(
    this.state.currentlyRenderedPins.map( (pin, idx) => {
      return(
        <div key={idx}>
          {pin}
        </div>
      )
    })
  )
}
```

## Technology

InterestMe runs on the Rails framework and is hosted on Heroku. Rails is used strictly as a RESTful API, returning JSON data and interpreted by React.js in the frontend.

As a single-page application, React.js and Flux are used in conjunction to manage frontend data. Node package manager (npm) is used to install all of the frontend dependencies.

A post-install script is configured so that webpack bundles all of the frontend files after the deployment to Heroku is complete. Webpack conveniently bundles all of the frontend components and Flux parts. The bundled file is located in /app/assets/javascripts and included in the main application.js file.

All of the React components, Flux action creators, API utilities, dispatcher, and stores are located in the frontend directory. jQuery was used for AJAX requests to communicate with the Rails backend. PostgresSQL RDBMS was used, in compliance with Heroku's database standards.

## Future Implementations
Extra functionality is desired. Features include:
- Search for users, pins, and boards
- Extra content for users to share on profile pages
