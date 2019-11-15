# Board Game Buddies Berlin

This is my first ever coding project, a platform for organizing board game sessions around Berlin. Players can either create and host a new session with a board game and location of their choosing, or join an already existing session.

### How to run (using axios calls)

Create a new player

```
axios.post('http://localhost:3000/player', {name: *String*}).then(console.log)
```

View player profile

```
axios.get('http://localhost:3000/player/:id').then(console.log)
```

View all players

```
axios.get('http://localhost:3000/player/all').then(console.log)
```

Delete player

```
axios.delete('http://localhost:3000/player/:id').then(console.log)
```

Player creates and hosts a new game session

```
axios.post('http://localhost:3000/player/:id/hostedSessions', {game: {name: *String*, minPlayers: *Number*, maxPlayers: *Number*}, language: *String*, datetime: *YYYY-MM-DDThh:mm*, location: *String*}).then(console.log)
```
- Player will be added as the game session's host
- Session will be added to the list of player's hosted game Sessions
- Game session will not be created if a past date is entered
- Host will also be added as a player in the Game Session
- MinPlayersMet has default value of false, since there can be no game session with only one player

Player visits an existing game session

```
axios.post('http://localhost:3000/player/:id/visitedSessions', {session: *Session id*}).then(console.log)
```
- Player will be added to the game session as a player
- Player will not be able to join the game session if the maxPlayers of the game has already been reached
- Player will not be able to join the game session if the time of the session is past
- Game session will be added to the list of player's visisted sessions

View all game sessions past, present and future

```
axios.get('http://localhost:3000/session/all').then(console.log)
```

View only game sessions on the current date

```
axios.get('http://localhost:3000/session/all/today').then(console.log)
```

View game session profile

```
axios.get('http://localhost:3000/session/:id').then(console.log)
```

Delete game session

```
axios.delete('http://localhost:3000/session/:id').then(console.log)
```

## Authors

* **Luke Grunau**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
