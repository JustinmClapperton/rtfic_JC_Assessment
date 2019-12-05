# Seddit by Justin Clapperton

## Initial Notes

Alright, so I saw your note about making using my backend abilities to try to make that part more complex but I decided to go with full frontend.  The reason is I have a lot less experience building frontend apps so this was a good source of practice.  Also I was concerned that if I spent too much time on my backend I wouldnt have had enough time making a Frontend to go along with it and I wanted to make sure I covered the primary requirements which was frontend related. 

That being said I will add a section below documenting how I would go about implementing a backend in detail.  

Any and all feedback is appreciated.  As I mentioned frontend is somewhere I have less experience in so learning from any mistakes I made would be greatly appreciated.  

Thanks

## How to run

1. `cd seddit_frontend`
2. `yarn install`
3. `yarn start`

You will be promted to login with a username and will see my initial mock data.  Data you create after this is only stored in that session so refreshing the page will lose it.  That being said I did store login details in a cookie so you will only need to login again if you hit Logout (or wait 7 days)

## Backend Design

### Architecture
    - Node
    - Typescript
    - Express
    - Sequelize
    - Sqlite

My plan was to build out an API using the following tools above.  

### Endpoints

/articles
    Response returns an array of articles:
        - title
        - content
        - authorName
        - comments(depth=3)
        - numberOfUpVotes
        - numberOfDownVotes

/comments?parent_id=#####
    Returns an array of comments:
        - comment
        - authorName
        - replies(depth=3)

### Models
    - User
        - username: string
        - password: string (stored as salt/hash in database)
        - articles: Article[]
    - Article
        - title: string
        - content: string
        - comments: Comment[]
        - votes: Vote[]
        - author: User
    - Comments
        - content: string
        - author: User
        - replies: Comment[]
    - Votes
        - voteType: VoteType(up, down)
        - author: User

    Models and relationships would be build using Sequelize.  

### Auth

I would setup an authentication layer with express that would allow users to create a username/password pair.  Passwords would be encrypted using bcrypt and storing the salt/hash in the sqlite database.  

### Frontend Communication

These are the changes I would need to make to the frontend in order to set this up. 

The frontend User model would now contain an `accessToken` property 

Once the user has logged in I would then do a query to the server.  I would set the list of comments to `Loading` and then upon resolving my promise the callback would load the view with all articles and change the state from `Loading.

As comments could theoretically go to unlimited depth I would pick an arbitrary depth such as 3 to be the max to start so the BE would know how many initial comments to query for.  I would then add a expand button similar to reddit that would hit the API again for deeper relies on a comment if they exist.

When creating/updating articles or comments I would send the POST request to the server, from there I would let the user know that the request is processing.  Upon receiving my response I would use the same upstream update flow Im currently using but would also include the objects ID.  This prevents me from needing to do a full requery of all articles each time I do an update.  

