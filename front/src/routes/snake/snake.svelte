<script lang='ts'>
let keyToPosition:{[key: string]: {x: number, y:number}} = {
    'd': {x:  1, y:  0},
    'a': {x: -1, y:  0},
    'w': {x:  0, y: -1},
    's': {x:  0, y:  1},
    'p': {x:  0, y:  0},
}
let lastMove = {x: 1, y: 0}
let points = 0
let console = ''
const boardSize = 16;
let grid = Array(boardSize).fill(Array(boardSize))

function getRandomNumber() {
    return Math.floor(Math.random() * boardSize);
}

function getRandomPosition() {
    return { x: getRandomNumber(), y: getRandomNumber() }
}

let applePosition = getRandomPosition();
let head = 0
let snake:{x: number, y: number}[] = [getRandomPosition()]
setInterval(() => {
   
    const newSnake:{x: number, y: number}[] = snake.map((node, index) => {
        if(index === head ) {
            return {
                x: node.x += lastMove.x,
                y: node.y += lastMove.y,
            }
        }
        return snake[index-1]
    })
    
    snake = newSnake
    if(snake[head].x === applePosition.x && snake[head].y === applePosition.y) {
        points += 100;
        applePosition = getRandomPosition();
        snake.push({x:snake[snake.length-1].x, y:snake[snake.length-1].y,})
    }
}, 600)


  const handleKeyUp = ({key}: KeyboardEvent) => {
      const {x, y} = keyToPosition[key] || { x: 0, y: 0 };
      if(
          snake[head].x + x < boardSize && 
          snake[head].y + y < boardSize && 
          snake[head].x + x >= 0 &&
          snake[head].y + y >= 0 
        ) {
            lastMove = {x, y};
        } else {
            console = 'Game Over'
        }
  }

</script>

<main>
<section class='board'>
    <section class='row'>
        <p>Points: {points}</p>
        <p>Console: {console}</p>
    </section>

    {#each grid as row, yIndex}
    <section class='row'>
        {#each row as _column, xIndex}
            {#if snake.some((item) => item.x === xIndex && item.y === yIndex)}
                <div class='snake'/> 
            {:else if xIndex === applePosition.x && yIndex === applePosition.y}
                <div class='apple'/>
            {:else}              
                <div/>
            {/if}
        {/each}
    </section>
    {/each}

</section>
</main>

<svelte:window on:keyup={handleKeyUp}/>

<style>
    main {
        display: flex;
        justify-content: center;
    }
    .row {
        display: flex;
        justify-content: space-between;
    }
    div {
        padding: 1em;
        border-style: solid;
        border-width: 0.1em;
        border-color: aliceblue;
        background-color: black;
    }

    .apple {
        background-color: crimson;
    }
    .snake {
        background-color: greenyellow;
    }
</style>