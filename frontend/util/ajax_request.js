export const unfollow = user => (
  $.ajax({
    method: 'DELETE',
    url: `/api/follows/1`,
    data: {user}
  })
)

export const follow = user => (
  $.ajax({
    method: 'POST',
    url: '/api/follows',
    data: {user}
  })
)

export const editProfilePage = user => (
  $.ajax({
      method: 'PATCH',
      url: `/api/users/${user.id}`,
      data: {user}
  })
)

export const getProfilePage = id => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${id}`
  })
)

export const getUserData = (id) => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${id}`
  })
)

export const getHome = () => (
  $.ajax({
    method: 'GET',
    url: 'api/pins'
  })
)

export const createPin = pin => (
  $.ajax({
    method: 'POST',
    url: 'api/pins',
    data: {pin}
  })
);

export const getPin = id => (
  $.ajax({
    method: 'GET',
    url: `api/single_pin_shows/${id}`
  })
)

export const getPins = id => (
  $.ajax({
    method: 'GET',
    url: `api/pins/${id}`
  })
);

export const editPin = pin => (
  $.ajax({
    method: 'PATCH',
    url: `api/pins/${pin.id}`,
    data: {pin}
  })
);

export const deletePin = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/pins/${id}`
  })
)

export const login = user =>(
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: {user}
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);

export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: {user}
  })
);

export const getCurrentUser = () => (
  $.ajax({
    method: 'GET',
    url: 'api/session'
  })
);

export const createBoard = board => (
  $.ajax({
    method: 'POST',
    url: '/api/boards',
    data: {board}
  })
);

export const getBoard = id => (
  $.ajax({
    method: 'GET',
    url: `/api/boards/${id}`
  })
);

export const editBoard = board => (
  $.ajax({
    method: 'PATCH',
    url: `/api/boards/${board.id}`,
    data: {board}
  })
);

export const deleteBoard = board => (
  $.ajax({
    method: 'DELETE',
    url: `/api/boards/${board.id}`
  })
);
