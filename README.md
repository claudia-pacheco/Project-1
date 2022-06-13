# Project 1 - Harry Potter Game 

Play the game [here](https://flying-harry-potter.netlify.app).

This is my first project for the General Assembly Software Engineering Immersive course. I used vanilla Javascript, HTML and CSS to create the game. The whole game was created using Canvas rather than a grid.


<img width="1440" alt="Screenshot 2022-04-06 at 12 22 25" src="https://user-images.githubusercontent.com/94257616/161964038-7329bb35-05f6-4cf5-9e87-ad7c6b04206d.png">

#### Table of contents

1. How it works
2. Build
3. Styling
4. Challenges and Wins
5. Key Learnings
6. Future improvements

## Tech Stack

Vanilla JavaScript, HTML, CSS, Canvas.

## How it works

The game only starts when the user clicks on the 'Start Game' button. This will then take Harry - main character - on a journey to dodge the dementors - obstacles - and collect golden snitches. Every time Harry catches a snitch, points are added to the player's total. The game ends when Harry hits a dementor. The player can restart the game at any point or when they die.

<img width="1439" alt="Screenshot 2022-04-06 at 12 28 13" src="https://user-images.githubusercontent.com/94257616/161964927-fe65d147-4f9e-4ca5-9a6d-23ea517f5a9e.png">

## Build

The project utilises vanilla Javascript, HTML and CSS. 
I started by creating a rough design of the game where a square has to go through random generated pipes.

<img width="363" alt="Screenshot 2022-04-06 at 12 33 17" src="https://user-images.githubusercontent.com/94257616/161965655-e849e0e8-6e29-4014-92e0-58adfa9b7c1c.png">

The characters were generated using a general Game Piece function which took certain parameters such as height, width, (x,y) coordinates.

<img width="534" alt="game-piece" src="https://user-images.githubusercontent.com/94257616/173321482-d0c747eb-9b71-409d-ab8d-e8c2b8d61572.png">

This allowed me to use DRY code rather than repeating the same block for Harry (the player), Dementors (the obstacles) and snitches (the points), they were then created on the canvas making sure they don't overlap. This can be seen in the update function where I grab the whole `gameArea` and draw the pieces accordingly. 
Additionally, I had to make sure the pieces weren't drawn beyond the canvas limit, so I adjusted them by using `gameArea.canvas.height` and `gameArea.canvas.width`. This would make sure both the obstacles and player wouldn't go beyond the game border.


<img width="387" alt="collision" src="https://user-images.githubusercontent.com/94257616/173322454-808d5d72-35c6-43e0-a057-9a385dd96592.png">

Once all of the pieces were drawn, I tested the game and soon realised the measurements weren't accurate. Harry would lose when the obstacle was still quite far away. This was due to the demonters picture being a whole square, rather than the actual demontors shape. Therefore I had to play around with the dimensions. As you can see, I had to add and subtract from the height and width to create the illusion that Harry would only lose when touching the actual image.

After making sure the basic functions were working - generating random size and random place obstacles; controlling the main character using the keyboard; generating random points to be collected and successfully added to the points counter - I then proceeded to style and give it more life.

## Styling 

With styling, I really wanted the game to have a Hogwarts feeling about it. I tried to be concise with the pictures I was choosing so it wasn't a cartoon and then a real life one. It was fairly simple to include pictures in my GamePiece function for the characters. 

<img width="569" alt="style" src="https://user-images.githubusercontent.com/94257616/173323160-49d2985a-989e-424a-8aff-d151588188c0.png">

I used a fixed height and width for each piece's dimention, and then only had to use the picture file name as the source.

The most challenging I would say was trying to add the audio into the page and style the canvas.
I hid a few buttons and the canvas to be only shown when playing/not playing the game.

## Challenges and Wins

The biggest challenge was definitely working with canvas in general. I struggled quite a lot when I added pictures to my characters. Since they were being recognised as squares or rectangles, the dimensions for collision were not accurate. As they were built in a canvas, when inspecting the elements on the browser, I wouldn't be able to see them individually - they existed inside the canvas. This proved to be quite difficult but I managed to play around with the values and succeeded in an accurate collision.

A particular win I was happy about was being able to draft a very simple version from the game effectively and then build it up. I think this process allowed me to think logically and not miss out on any important aspects keeping me on track throughout the project time frame.

## Key Learnings 

The biggest achievement with this project was definitely working with canvas rather than grid. I pushed myself out of my comfort zone, went for it and was very pleased with the final result. Additionally, I was very happy with the work pace of my project. I managed to stay on track which allowed me to complete some extra features that I really wanted - such as the audio background that you can toggle with a button.

## Future Improvements

Areas to improve:

- Add different random objects to be collected as points
- Introduce the choice of selecting a different character when initially playing the game
- Add movement to obstacles so it's not static

Bugs to be fixed:

- Obstacle's dimensions aren't always accurate so the player ends up sometimes not losing if hitting an obstacle.
